'use strict'
const Transaction = use('App/Models/Transaction')
const Category = use('App/Models/Category')

class TransactionController {
  async index({ auth }) {
    // Get requried params
    var transactions = await Transaction.query().where({ user_id: auth.user.id }).orderBy('id', 'desc').with('categories').fetch()

    return transactions
  }

  async store({ response, request, auth }) {
    // Get Payload
    const { type, transaction_date, amount, category_id, location } = request.all()

    const category = await Category.find(category_id)

    await category
      .transactions()
      .create({
        user_id: auth.user.id,
        type,
        transaction_date,
        title: category.name,
        amount,
        location
      })


    return response.status(200).send({
      "title": "Success",
      "body": "Your Transaction has been created successfully",
    })
  }

  async update({ params, request, response }) {
    //  Get Required params
    const { type, transaction_date, amount, location } = request.all()

    // Create transctions
    const transaction = await Transaction.find(params.id)

    // Merge transcations
    transaction.merge({
      type,
      transaction_date,
      amount,
      location
    })
    await transaction.save()

    // Return resposne
    return response.status(200).send({
      "title": "Success",
      "body": "Your Transaction has been updated successfully",
    })

  }

  async destroy({ params, response }) {
    // Ge transaction using provided key
    const transaction = await Transaction.find(params.id)

    // Run Delete operation
    await transaction.delete()

    // Return success msg 
    return response.status(200).send({
      "title": "Success",
      "body": "Your Transaction has been deleted successfully",
    })
  }
}

module.exports = TransactionController
