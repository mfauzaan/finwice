'use strict'

/**
 * Abstract Class to be extended from Validators
 *
 * BaseValidator provides the common logic that needs
 * to be inherited by other Validators.
 */

class BaseValidator {

  // Define the default/fallback messages
  constructor() {
    this.title = "Validation Failed"
    this.body = "Request failed, please try again after addressing the following issues:"
  }

  /**
   * Response to be sent once the Validation Fails
   *
   * Properties in the response can be overriden by defining
   * in the constuctor of the class that inherits the behavior.
   */
  fails(errorMessages) {
    return this.ctx.response.status(422).send({
      "title": this.title,
      "body": this.body,
      "messages": errorMessages.map(field => field.message),
      "invalid_fields": errorMessages.map(field => field.field)
    })
  }

  // Validation should fail after evaluating all the rules
  validateAll() {
    return true
  }

}

module.exports = BaseValidator