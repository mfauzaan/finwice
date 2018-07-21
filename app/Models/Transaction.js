'use strict'

const Model = use('Model')

class Transaction extends Model {
  static get dates() {
    return super.dates.concat(['transaction_date'])
  }
}

module.exports = Transaction
