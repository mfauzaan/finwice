'use strict'
const User = use('App/Models/User')
const moment = use('moment');

class UserController {
  async register({ request, response }) {
    // Get Required params
    const { name, mobile_number, password, dob, gender } = request.all()

    // Create User
    await User.create({
      name,
      mobile_number,
      password,
      dob: moment(dob),
      gender
    })

    // Return response data
    return response.send({ title: 'Registration Succesfull', body: 'You have succesfully registered in finwice.' })
  }

  async login({ request, auth, response }) {
    // Get Required data
    const { mobile_number, password } = request.all()

    
      const userData = await User.findBy({ mobile_number })

      if (!userData) {
        return response.unauthorized({ title: 'Login Failed', body: 'User not found.'})
      }
   
    // Try to login
    const user = await auth.attempt(mobile_number, password)

    user.name = userData.name
    user.mobile_number = userData.mobile_number

    // Login Success
    return response.send({ title: 'Login Succesfull', body: 'You have succesfully registered in finwice.', data: user })
  }
}

module.exports = UserController
