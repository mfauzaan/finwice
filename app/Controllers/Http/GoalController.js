'use strict'
const Goal = use('App/Models/Goal')
const Category = use('App/Models/Category')
const Transaction = use('App/Models/Transaction')
var _ = use('lodash')

class GoalController {
  async index({ auth }) {
    // Get requried params
    var goals = await Goal.query().where({ user_id: auth.user.id }).orderBy('id', 'desc').with('categories').fetch()
    return goals
  }

  async store({ response, request, auth }) {
    // Get Payload
    const { title, category_id, starting_date, due_date, target_amount } = request.all()

    const category = await Category.find(category_id)

    await category
      .goals()
      .create({
        title, starting_date, due_date, target_amount, user_id: auth.user.id
      })

    return response.status(200).send({
      "title": "Success",
      "body": "Your Goal has been created successfully",
    })
  }

  async update({ params, request, response }) {
    //  Get Required params
    const { title, starting_date, due_date, target_amount } = request.all()

    // Create transctions
    const goal = await Goal.find(params.id)

    // Merge transcations
    goal.merge({
      title, starting_date, due_date, target_amount
    })

    await goal.save()

    // Return resposne
    return response.status(200).send({
      "title": "Success",
      "body": "Your Goal has been updated successfully",
    })

  }

  async destroy({ params, response }) {
    // Ge transaction using provided key
    const goal = await Goal.find(params.id)

    // Run Delete operation
    await goal.delete()

    // Return success msg 
    return response.status(200).send({
      "title": "Success",
      "body": "Your Goal has been deleted successfully",
    })
  }

  async status({ auth, response }) {
    const income = await Transaction.query().where({ user_id: auth.user.id, type: 'Income' }).fetch()
    const expense = await Transaction.query().where({ user_id: auth.user.id, type: 'Expense' }).fetch()

    var total = _.sumBy(income.toJSON(), 'amount') - _.sumBy(expense.toJSON(), 'amount')
    var status = 'Safe'

    if (total <= 0) {
      status = 'Danger'
    }

    // Return success msg 
    return response.status(200).send({
      "title": status,
      "tatal": total,
    })
  }
}

module.exports = GoalController
