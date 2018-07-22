'use strict'
const Transaction = use('App/Models/Transaction')
const Category = use('App/Models/Category')
const Merchant = use('App/Models/Merchant')
const axios = use('axios')

class TransactionController {
  async index({ auth }) {
    var transactions = await Transaction.query().where({ user_id: auth.user.id }).with('merchants.categories').fetch()
    
    transactions = transactions.toJSON()

    for(var i in transactions) {
      transactions[i].icon = 'default.png'
      if (transactions[i].merchants) {
        if (transactions[i].merchants.categories) {
         // transactions[i].icon = transactions.merchants.categories
          transactions[i].icon = `${transactions[i].merchants.categories.name}.png`
        }
      }
      
    }
    return transactions
  }

  async store({ response, request, auth }) {
    // Get Payload
    const { payload, bank, type, transaction_date, activity, title, amount } = request.all()

    switch (bank) {
      case true:
        // Loop transaction  
        for (var transaction of payload.history) {
          var category = null
          var foursquare = null
          var merchant = null

          if (transaction.description == 'Purchase') {
            foursquare = await axios({
              url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${transaction.narrative3}%Maldives&inputtype=textquery&fields=type,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBl6U5R41doIYntDwSeHIOaZsaIk6KmlV8`,
              method: 'get',
            })
            
            if (foursquare.data) {
              category = await Category.findOrCreate(
                { name: foursquare.data.candidates[0].types[0].toLowerCase() },
                { name: foursquare.data.candidates[0].types[0].toLowerCase() }
              )

              merchant = await Merchant.findOrCreate(
                { name: transaction.narrative3.toLowerCase() },
                { name: transaction.narrative3.toLowerCase(), location: foursquare.data.candidates[0].formatted_address, country: foursquare.data.candidates[0].formatted_address, category_id: category.id }
              )
            }
          }

          // Create Transaction
          await Transaction.create({
            type: transaction.description,
            transaction_date: transaction.bookingDate,
            activity: transaction.minus == true ? 'Credited' : 'Debited',
            title: transaction.narrative3,
            amount: transaction.amount,
            user_id: auth.user.id,
            merchant_id: merchant ? merchant.id : null
          })
        }
        break;
      case false:
        await Transaction.create({
          type,
          transaction_date,
          activity,
          title,
          amount,
          category_id,
          user_id: auth.user.id,
        })
        break;
      default:
        break;
    }


    return response.status(200).send('Transaction has been updated successfully.')
  }

  async show() {
  }


  async update() {
  }

  async destroy() {
  }
}

module.exports = TransactionController
