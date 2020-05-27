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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const edge = use('edge.js')
const Helpers = use('Helpers')
const Database = use('Database')
    //const datos = Database.table('datos').select('id', 'fecha', 'temperatura', 'humedad')

Route.on('/').render('welcome')
Route.get('numeros2', 'InicioController.numeros2');
Route.post('fechafin', 'InicioController.fechafin');
Route.post('ids', 'InicioController.temperatura');
Route.get('datosactuales', 'InicioController.datosactuales');
//Route.get('ultimafecha', 'InicioController.ultimafecha');