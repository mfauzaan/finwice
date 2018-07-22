'use strict'
const Transaction = use('App/Models/Transaction')
const Category = use('App/Models/Category')
const Merchant = use('App/Models/Merchant')
const axios = use('axios')

class TransactionController {
  async index({ auth }) {
    return await Transaction.query().where({ user_id: auth.user.id }).with('merchants.categories').fetch()
  }

  async store({ response, request, auth }) {
    // Get Payload
    const { payload, bank, type, transaction_date, activity, title, amount, merchant_id } = request.all()

    switch (bank) {
      case true:
        // Loop transaction  
        for (var transaction of payload.history) {
          var category = null
          var foursquare = null
          var merchant = null

          if (transaction.description == 'Purchase') {
            foursquare = await axios({
              url: `https://api.foursquare.com/v2/venues/search?near=Male, MV&query=${transaction.narrative3}&limit=1&client_id=E1AGYMO2NGCXFOVEYC2EVO2HB43IUJDEZVQCMPAC5LXMT0FJ&client_secret=FNRBDZ4YCP0KULDJLL0XO3FVADCEFVBSLOAVNTOLJQEYTR10&v=20180323`,
              method: 'post',
            })

            if (foursquare.data) {
              
              category = await Category.findOrCreate(
                { name: foursquare.data.response.venues[0].categories[0].name.toLowerCase() },
                { name: foursquare.data.response.venues[0].categories[0].name.toLowerCase() }
              )

              merchant = await Merchant.findOrCreate(
                { name: foursquare.data.response.venues[0].name.toLowerCase() },
                { name: foursquare.data.response.venues[0].name.toLowerCase(), location: foursquare.data.response.venues[0].location.address, country: foursquare.data.response.venues[0].location.city, category_id: category.id }
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
