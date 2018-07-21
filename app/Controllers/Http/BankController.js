'use strict'
const axios = use('axios')

class BankController {
  async store({ request, auth }) {
    const { data } = request.all()

    return data
  }
}

module.exports = BankController
