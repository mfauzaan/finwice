'use strict'
const Category = use('App/Models/Category')

class CategoryController {
  async index ({ response }) {
    // Get all Categories
    const categories = await Category.query().whereNot({ parent_id: null}).fetch()
    return response.status(200).send(categories)
  }
}

module.exports = CategoryController
