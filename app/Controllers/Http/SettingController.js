'use strict'
const User = use('App/Models/User')

class SettingController {
  async index ({ auth, response }) {
    const user = await User.query().where({ id: auth.user.id }).setVisible(['id', 'mobile_number', 'name', 'email', 'gender', 'dob']).first()

    return response.status(200).json(user)
  }
}

module.exports = SettingController
