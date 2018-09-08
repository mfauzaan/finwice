'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    // Create User
    await User.create({
      name: 'Mohamed Fauzaan',
      mobile_number: 9609557555,
      password: 'secret',
      dob: '08/01/1997',
      gender: 'Male'
    })
  }
}

module.exports = UserSeeder
