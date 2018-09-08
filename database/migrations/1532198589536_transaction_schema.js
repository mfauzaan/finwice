'use strict'

const Schema = use('Schema')

class TransactionSchema extends Schema {
  up() {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete()
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete()
      table.string('title')
      table.string('description')
      table.string('type')
      table.string('activity')
      table.float('amount')
      table.timestamp('transaction_date')
      table.timestamps()
    })
  }

  down() {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
