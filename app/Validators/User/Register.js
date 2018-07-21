'use strict'

const BaseValidator = use('App/Validators/BaseValidator')

class Register extends BaseValidator {

  constructor() {
    super()

    this.title = "Registration Failed"
    this.body = "Please try again after filling all the required fields."
  }

  // Validation Rules
  get rules() {
    return {
      name: 'required',
      mobile_number: 'required|unique:users,mobile_number',
      password: 'required'
    }
  }

  // Error Messages
  get messages() {
    return {
      'name.required': 'Please provide your name.',
      'mobile_number.required': 'Please provide a mobile number.',
      'mobile_number.unique': 'Account already registerd',
      'password.required': 'Please provide a password.',
    }
  }

}

module.exports = Register