'use strict'

const Model = use('Model')
const Env = use('Env')

class Category extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'description', 'parent_id']
  }

  getIcon(icon) {
    return `${Env.get('APP_URL')}${icon}`
  }

  /* Relationships */

  transactions() {
    return this.hasMany('App/Models/Transaction')
  }

  goals() {
    return this.hasMany('App/Models/Goal')
  }
}

module.exports = Category
