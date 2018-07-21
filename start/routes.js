'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Finwice REST API.' }
})


Route.group(()=> {
  Route.post('register', 'UserController.register').validator('User/Register')

  Route.post('login', 'UserController.login')
}).prefix('v1/auth')

Route.group(() => {
  Route.get('/', 'FeedController.index')

  Route.post('bank_data', 'BankController.store')

  Route.resource('transactions', 'TransactionController')
}).prefix('v1/').middleware('auth')