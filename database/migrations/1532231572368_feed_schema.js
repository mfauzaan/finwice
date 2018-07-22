'use strict'

const Schema = use('Schema')

class FeedSchema extends Schema {
  up () {
    this.create('feeds', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('feeds')
  }
}

module.exports = FeedSchema
