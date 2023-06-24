
// documentacion de emergencia


/**
* @swagger
* tags:
*   - name: Usuarios
*     description: Operaciones relacionadas con usuarios
*   - name: Métricas
*     description: Operaciones relacionadas con métricas
*   - name: Agregar Botón
*     description: Operaciones relacionadas con agregar botón
*/


/**
 * @swagger
 * /login:
 *       post:
 *         tags:
 *           - Usuarios
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
 *            description: usuario autenticado
 *            content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                status:
 *                type: integer
 *                example: 200
 *              mensaje:
 *                type: string
 *                example: usuario autenticado
 *              data:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 2
 *                  auth:
 *                    type: boolean
 *                    example: true
 *          400 - 500:
 *            description: Mensajes de error y alertas sobres campos requeridos
 * /agregar_boton:
 *               post:
 *                  tags:
 *                    - Agregar Botón
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
 *                     content:
 *                       application/json:
 *                         schema:
 *                           type: object
 *                           properties:
 *                             status:
 *                               type: integer
 *                               example: 200
 *                           mensaje:
 *                             type: string
 *                             example: agregar_boton
 *                   400 - 500:
 *                     description: Mensajes de error y alertas sobres campos requeridos
 * 
 * /metricas:
 *         get:
 *           tags:
 *             - Métricas
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
 *               content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        status:
 *                          type: integer
 *                          example: 200
 *                        mensaje:
 *                          type: string
 *                          example: metricas
 *                        clicks:
 *                          type: string
 *                          example: 2
 *                        aperturas:
 *                          type: string
 *                          example: 0
 *            400 - 500:
 *               description: Mensajes de error y alertas sobres campos requeridos
 * 
 * /lista_service:
 *              get:
 *                tags:
 *                  - Agregar Botón
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
 *                    content:
 *                      application/json:
 *                        schema:
 *                          type: object
 *                          properties:
 *                            status:
 *                              type: integer
 *                              example: 200
 *                            mensaje:
 *                              type: string
 *                              example: lista de datos
 *                            datos:
 *                              type: array
 *                              items:
 *                                type: object
 *                                properties:
 *                                  id:
 *                                    type: string
 *                                    example: 1
 *                                  id_user:
 *                                    type: string
 *                                    example: 2
 *                                  name_event:
 *                                    type: string
 *                                    example: whatsapp
 *                                  date:
 *                                    type: string
 *                                    example: 2023-05-31T05:00:00.000Z
 *                                  hour:
 *                                    type: string
 *                                    example: 13:13:05.894509
 *                 400 - 500:
 *                    description: Mensajes de error y alertas sobres campos requeridos
 * 
 * /estadistica:
 *             get:
 *               tags:
 *                 - Agregar Botón
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
 *                  content:
 *                    application/json:
 *                        schema:
 *                          type: object
 *                          properties:
 *                            status:
 *                              type: integer
 *                              example: 200
 *                            mensaje:
 *                              type: string
 *                              example: Datos disponibles
 *                            estadisticas:
 *                              type: object
 *                              properties:
 *                                contacto:
 *                                  type: string
 *                                  example: 3
 *                                facebook:
 *                                  type: string
 *                                  example: 0
 *                                whatsapp:
 *                                  type: string
 *                                  example: 6
 *                                etc:
 *                                  type: string
 *                                  example: .....
 *                            total:
 *                             type: string
 *                             example: 9
 *                400 - 500:
 *                 description: Mensajes de error y alertas sobres campos requeridos
 *  
*/