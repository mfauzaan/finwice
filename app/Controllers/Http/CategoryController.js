'use strict'
const Category = use('App/Models/Category')

class CategoryController {
  async index ({ response }) {
    // Get all Categories
    const categories = await Category.all()
    return response.status(200).send(categories)
  }
}

module.exports = CategoryController
