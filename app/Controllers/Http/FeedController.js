'use strict'
const brain = use('brain.js')
const Helpers = use('Helpers')
const fs = require('fs');
var _ = use('lodash');
const csv = require('csvtojson');

class FeedController {
  async index() {
    var salary = 2000;
    //provide optional config object (or undefined). Defaults shown.
    var net = new brain.NeuralNetwork({
      activation: 'sigmoid', // activation function
      hiddenLayers: [6],
      learningRate: 0.1 // global learning rate, useful when training using streams
    });

    const dataset = [
      { input: { g: 2000, b: 1000 }, output: { bad: 1 } },
      { input: { g: 4000, b: 200 }, output: { good: 1 } },
      { input: { g: 4000, b: 1000 }, output: { bad: 1 } },
      { input: { g: 5000, b: 600 }, output: { good: 1 } },
      { input: { g: 5000, b: 1000 }, output: { bad: 1 } },
      { input: { g: 6000, b: 500 }, output: { good: 1 } },
      { input: { g: 7000, b: 600 }, output: { good: 1 } },
      { input: { g: 7000, b: 2000 }, output: { bad: 1 } },
      { input: { g: 8000, b: 700 }, output: { good: 1 } },
      { input: { g: 9000, b: 1000 }, output: { good: 1 } }
    ]

    await net.train(dataset, {
      errorThresh: 0.005,  // error threshold to reach
      iterations: 20000,   // maximum training iterations
      log: true,           // console.log() progress periodically
      logPeriod: 10,       // number of iterations between logging
      learningRate: 0.6    // learning rate
    })

    var output = await net.run({ g: salary, b: 1000 });  // { white: 0.99, black: 0.002 }
    
    if (output.good < output.bad) {
      return 'You need to save on beauty.'
    } else {
      return 'You can spend on beauty.'
    }



    return output
  }
}

module.exports = FeedController
