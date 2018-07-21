'use strict'
const Transaction = use('App/Models/Transaction')
const axios = use('axios')


class TransactionController {
  async index() {
  }

  async create() {
  }

  async store({ response, request, auth }) {
    // Get Payload
    const { payload } = request.all()
    
    // Loop transaction  
    for (var transaction of payload.history) {



      await Transaction.create({
        type: transaction.description,
        transaction_date: transaction.bookingDate,
        activity: transaction.minus == true ? 'Credited' : 'Debited',
        title: transaction.narrative3,
        amount: transaction.amount,
        user_id: auth.user.id
      })
    }

    return response.status(200).send('Transaction has been updated successfully.')
  }

  async show() {
  }

  async edit() {
  }

  async update() {
  }

  async destroy() {
  }
}

module.exports = TransactionController
