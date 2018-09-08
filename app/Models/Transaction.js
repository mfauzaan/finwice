'use strict'

const Model = use('Model')

class Transaction extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'user_id', 'merchant_id', 'description', 'activity']
  }


  static get dates() {
    return super.dates.concat(['transaction_date'])
  }

  merchants() {
    return this.hasOne('App/Models/Merchant', 'merchant_id', 'id')
  }

  categories() {
    return this.hasOne('App/Models/Category', 'category_id', 'id')
  }

}

module.exports = Transaction
