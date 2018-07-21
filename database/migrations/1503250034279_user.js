'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('mobile_number', 80).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('name')
      table.string('email')
      table.string('gender')
      table.string('salary_type')
      table.string('salary_amount')
      table.timestamp('dob')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
