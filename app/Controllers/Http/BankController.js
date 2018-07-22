'use strict'
const axios = use('axios')

class BankController {
  async login({ request, auth }) {
    const { data } = request.all()

    return 'Success'
  }
}

module.exports = BankController
