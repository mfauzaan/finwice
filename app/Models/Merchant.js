'use strict'

const Model = use('Model')

class Merchant extends Model {
  categories() {
    return this.hasOne('App/Models/Category', 'category_id', 'id')
  }
}

module.exports = Merchant
