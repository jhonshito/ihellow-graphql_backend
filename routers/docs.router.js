
// documentacion de emergencia


/**
* @swagger
* tags:
*   - name: Auth
*     description: Operaciones relacionadas con usuarios
*   - name: buttons
*     description: Operaciones relacionadas con los botones
*   - name: Agregar Botón
*     description: Operaciones relacionadas con agregar botón
*/


/**
 * @swagger
 * /login:
 *       post:
 *         tags:
 *           - Auth
 *         description: Con esta ruta podras hacer el login del usuario. el parametro llamado ismetodo tiene que tener como valor login o firebase eso nos indicara que tipo de login se hara
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
 *                    ismetodo:
 *                      type: string
 *                    toke:
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
 * /add_foto/:id:
 *          post:
 *             tags:
 *               - Auth
 *             description: Agrega foto de perfil del usuario.
 *             parameters:
 *               - in: query
 *                 name: id
 *                 required: true
 *                 description: Debes de enviar el id del usuario como parametro a través de la url de la api.
 *                 schema:
 *                  id:
 *                    type: string
 *             requestBody:
*                required: true
*                content:
*                  multipart/form-data:
*                    schema:
*                      type: object
*                      properties:
*                        file:
*                          type: file
*                          format: binary
*                          description: Debes de enviar una imagen con el nombre file.
*             responses:
*                200:
*                  description: Foto de perfil agregada exitosamente.
*                  content:
*                       application/json:
*                         schema:
*                           type: object
*                           properties:
*                             status:
*                               type: integer
*                               example: 200
*                             mensaje:
*                               type: string
*                               example: Imagen agregada exitosamente
*                             img:
*                               type: url
*                               example: https://img_example_foto_perfil
*                400 - 500:
*                  description: Mensajes de error y alertas sobre campos requeridos o errores en la solicitud.
 * 
 * /data_user/:id:
 *               get:
 *                  tags:
 *                    - Auth
 *                  description: Con esta ruta podras obtener los datos del usuario a través de su (id).
 *                  parameters:
 *                    - in: query
 *                      name: id
 *                      description: Trae los datos del usuario
 *                      example: 2
 *                      schama:
 *                          type: string
 *                  responses:
 *                   200:
 *                     description: Respuesta exitosa de los datos del usuario
 *                     content:
 *                      application/json:
 *                        schema:
 *                          type: object
 *                          properties:
 *                            status:
 *                              type: integer
 *                              example: 200
 *                            mansaje:
 *                              type: string
 *                              example: usuario
 *                            data:
 *                              type: object
 *                              example:
 *                                id: 2
 *                                toke: token de firebase
 *                                login: nombreusuario@gmail.com
 *                                phone: +57376576
 *                                role: boleano
 *                                logo: http://img_user_perfil.jpg
 *                                city: 76000
 *                                country:
 *                                    value: colombia
 *                                    label: bandera de colombia
 *                                name: nombre del usuario
 *                                complete: boleano
 *                   400:
 *                      content:
 *                       application/json:
 *                         schema:
 *                           type: object
 *                           properties:
 *                             status:
 *                              type: integer
 *                              example: 400
 *                             mensaje:
 *                              type: string
 *                              example: El id del usuario es requerido.
 *                   404:
 *                      content:
 *                       application/json:
 *                         schema:
 *                           type: object
 *                           properties:
 *                             status:
 *                              type: integer
 *                              example: 404
 *                             mensaje:
 *                              type: string
 *                              example: No hay usuario
 *                   500:
 *                      content:
 *                       application/json:
 *                         schema:
 *                           type: object
 *                           properties:
 *                             status:
 *                              type: integer
 *                              example: 500
 *                             mensaje:
 *                              type: string
 *                              example: Ocurrio un error
 * 
 * /update_profile:
 *                put:
 *                  tags:
 *                    - Auth
 *                  description: Con esta ruta podras actualizar los datos del usuario.
 *                  requestBody:
 *                     required: true
 *                     content:
 *                       application/json:
 *                         schema:
 *                           type: object
 *                           properties:
 *                             id:
 *                              type: string
 *                             name:
 *                              type: string
 *                             country:
 *                              type: object
 *                             phone:
 *                              type: string
 *                             city:
 *                              type: string
 *                  responses:
 *                   200:
 *                      content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 200
 *                              mensaje:
 *                                 type: string
 *                                 example: Datos del usuario actualizado
 *                              update:
 *                                 type: boleano
 *                                 example: true
 *                   400:
 *                      content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 400
 *                              mensaje:
 *                                 type: string
 *                                 example: El id del usuario es requerido.
 *                   404:
 *                      content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 404
 *                              mensaje:
 *                                 type: string
 *                                 example: No se pudo actualizar los datos.
 *                              update:
 *                                 type: boleano
 *                                 example: false
 *                   500:
 *                      content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 500
 *                              mensaje:
 *                                 type: string
 *                                 example: Ocurrio algo
 * /send_email:
 *            post:
 *               tags:
 *                 - Auth
 *               description: Con esta ruta podras enviar un correo para restablecer la contraseña de un usuario.
 *               requestBody:
 *                  required: true
 *                  content:
 *                    application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          email:
 *                           type: string
 *                           example: usuario@correo.com
 *               responses:
 *                200:
 *                   content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 200
 *                              mensaje:
 *                                 type: string
 *                                 example: Revisa tu correo
 *                400:
 *                   content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 400
 *                              mensaje:
 *                                 type: string
 *                                 example: El email es requerido.
 *                404:
 *                   content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 404
 *                              mensaje:
 *                                 type: string
 *                                 example: Usuario no registrado
 *                500:
 *                   content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 500
 *                              mensaje:
 *                                 type: string
 *                                 example: Ocurrio un error
 * 
 * /update_pass:
 *             put:
 *               tags:
 *                 - Auth
 *               description: Con esta ruta podras restablecer la contraseña del usuario debes de enviar el id del usuario y su nueva contraseña
 *               requestBody:
 *                  required: true
 *                  content:
 *                    application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          id:
 *                           type: string
 *                          password:
 *                            type: string
 *               responses:
 *                200:
 *                   content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 200
 *                              mensaje:
 *                                 type: string
 *                                 example: Password restablecida
 *                              update:
 *                                  type: boleano
 *                                  example: true
 *                400:
 *                   content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 400
 *                              mensaje:
 *                                 type: string
 *                                 example: Los datos son requeridos.
 *                404:
 *                   content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 404
 *                              mensaje:
 *                                 type: string
 *                                 example: No se pudo restablecer el password.
 *                              update:
 *                                  type: boleano
 *                                  example: false
 *                500:
 *                   content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 500
 *                              mensaje:
 *                                 type: string
 *                                 example: Ocurrio un error
 * 
 * /register_google:
 *                 post:
 *                    tags:
 *                      - Auth
 *                    description: Con esta ruta podras registrar el usuario con google
 *                    requestBody:
 *                       required: true
 *                       content:
 *                         application/json:
 *                           schema:
 *                             type: object
 *                             properties:
 *                               token:
 *                                type: string
 *                               email:
 *                                type: string
 *                               name:
 *                                type: string
 *                               photo:
 *                                type: string
 *                    responses:
 *                     200:
 *                       content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 200
 *                              mensaje:
 *                                 type: string
 *                                 example: usuario
 *                              data:
 *                                 type: object
 *                                 example:
 *                                  img: http://mi_image.jpg
 *                                  id: usuario id
 *                                  id_card: card id
 *                                  id_landing: landing id
 *                                  name: nombre del usuario
 *                                  role: usuario role
 *                     400:
 *                       content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 400
 *                              mensaje:
 *                                 type: string
 *                                 example: los campos no pueden estar vacios
 *                     404:
 *                       content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 404
 *                              mensaje:
 *                                 type: string
 *                                 example: Credenciales invalidas.
 *                              auth:
 *                                  type: boleano
 *                                  example: true
 *                     500:
 *                       content:
 *                        application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                              status:
 *                                type: integer
 *                                example: 500
 *                              mensaje:
 *                                 type: string
 *                                 example: Ocurrio un error
 * 
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
 *         post:
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