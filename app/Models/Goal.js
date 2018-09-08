'use strict'

const Model = use('Model')

class Goal extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'user_id']
  }
  /* Relationships */

  categories() {
    return this.hasOne('App/Models/Category', 'category_id', 'id')
  }
}

module.exports = Goal
