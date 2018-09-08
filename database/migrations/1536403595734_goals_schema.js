'use strict'

const Schema = use('Schema')

class GoalsSchema extends Schema {
  up () {
    this.create('goals', (table) => {
      table.increments()
      table.string('title')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete()
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete()
      table.timestamp('starting_date')
      table.timestamp('due_date')
      table.float('target_amount')
      table.timestamps()
    })
  }

  down () {
    this.drop('goals')
  }
}

module.exports = GoalsSchema
