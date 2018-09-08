'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Category = use('App/Models/Category')

class CategorySeeder {
  async run () {
    await Category.createMany([
      { name: 'Travel', parent_id: null, icon: '/icons/travel-icon.png'},
      { name: 'Air Travel', parent_id: 1, icon: '/icons/travel-icon.png'},
      { name: 'Food & Dining', parent_id: null, icon: '/icons/restaurant.png'},
      { name: 'Coffee Shops', parent_id: 3, icon: '/icons/restaurant.png'},
      { name: 'Fast Food', parent_id: 3, icon: '/icons/restaurant.png'},
      { name: 'Restaurents', parent_id: 3, icon: '/icons/restaurant.png'},
      { name: 'Bills & Utilities', parent_id: null, icon: '/icons/bill-icon.png'},
      { name: 'House Rent', parent_id: 7, icon: '/icons/bill-icon.png'}
    ])
  }
}

module.exports = CategorySeeder
