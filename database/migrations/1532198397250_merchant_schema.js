'use strict'

const Schema = use('Schema')

class MerchantSchema extends Schema {
  up () {
    this.create('merchants', (table) => {
      table.increments()
      table.string('name')
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete()
      table.string('location')
      table.string('geo_coordinates')
      table.string('country')
      table.timestamps()
    })
  }

  down () {
    this.drop('merchants')
  }
}

module.exports = MerchantSchema
