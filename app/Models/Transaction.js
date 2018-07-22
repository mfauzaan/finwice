'use strict'

const Model = use('Model')

class Transaction extends Model {
  static get dates() {
    return super.dates.concat(['transaction_date'])
  }

  merchants() {
    return this.hasOne('App/Models/Merchant', 'merchant_id', 'id')
  }

}

module.exports = Transaction
