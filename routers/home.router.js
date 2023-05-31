const { Router } = require('express');
const { datos_metricas, login, nuevo_boton, lista_service, estadistica_service } = require('../resolversArchivo/resolvetion');


//documentacion de la api
/**
 * @swagger
 * /login:
 *       get:
 *         description: Con esta ruta podras hacer el login del usuario
 *         requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    namesuser:
 *                      type: string
 *                    password:
 *                      type: string
 * 
 *         responses:
 *          200:
 *            description: usuario
 *          400 - 500:
 *            description: Mensajes de error y alertas sobres campos requeridos
 * /agregar_boton:
 *               post:
 *                  description: Con esta ruta podras guardar los datos de los eventos del usuarios cuando hacen click en el boton que ellos quieren
 *                  requestBody:
 *                     required: true
 *                     content:
 *                       application/json:
 *                         schema:
 *                           type: object
 *                           properties:
 *                             id_user:
 *                               type: string
 *                             name_event:
 *                               type: string
 *                  responses:
 *                   200:
 *                     description: click agregado,
 *                   400 - 500:
 *                     description: Mensajes de error y alertas sobres campos requeridos
 * 
 * /metricas:
 *         get:
 *           description: Con esta ruta podras ver el resumen de los clicks y las aperturas
 *           requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      fechaInicial:
 *                         type: string
 *                      fechaFinal:
 *                         type: string
 *           responses:
 *            200:
 *               description: te dara el resumen de los clicks y las aperturas filtrado por fechas
 *            400 - 500:
 *               description: Mensajes de error y alertas sobres campos requeridos
 * 
 * /lista_service:
 *              get:
 *                description: Con esta ruta podras obtener todos los datos de los clicks y las aperturas
 *                requestBody:
 *                   required: true
 *                   content:
 *                     application/json:
 *                       schema:
 *                         type: object
 *                         properties:
 *                           fechaInicial:
 *                              type: string
 *                           fechaFinal:
 *                              type: string
 *                responses:
 *                 200:
 *                    description: Te devuelve una lista de datos de los clicks y las aperturas
 *                 400 - 500:
 *                    description: Mensajes de error y alertas sobres campos requeridos
 * 
 * /estadistica:
 *             get:
 *               description: Esta ruta te dara unas estadisticas de los datos filtrado por fechas
 *               requestBody:
 *                  required: true
 *                  content:
 *                    application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          fechaInicial:
 *                             type: string
 *                          fechaFinal:
 *                             type: string
 *               responses:
 *                200:
 *                  description: te va a retornar las estadisticas de los datos
 *                400 - 500:
 *                  description: Mensajes de error y alertas sobres campos requeridos
 *  
*/


const router = Router();
router.get('/metricas', datos_metricas);
router.get('/login', login);
router.post('/agregar_boton', nuevo_boton);
router.get('/lista_service', lista_service);
router.get('/estadistica', estadistica_service);

module.exports = router
