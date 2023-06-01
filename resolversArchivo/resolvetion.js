const { pool } = require('../db')

//querys de graphql
const resolvers = {
    Query: {
        //login
        usuarios: async(_, { namesuser, password }) => {
            const client = await pool.connect();

            try {
                
                const query = `
                    SELECT *
                    FROM tbuser WHERE namesuser = $1 AND password = $2
                `;

                const values = [namesuser, password];
                const result = await client.query(query, values);
                const usuario = result.rows[0];

                if (!usuario) {
                    return {
                        status: 404,
                        mensaje: 'Credenciales invalidas',
                        auth: false
                    }
                }

                return {
                    status: 200,
                    mensaje: 'usuario',
                    data: {
                        id: usuario.id,
                        auth: true
                    }
                };

            } catch (error) {
                return {
                    status: 500,
                    mensaje: 'ocurrio un error el servicio del login:',
                    error
                }
            }finally{
                client.release();
            }
        },

        //traer la cantidad de los botones que sean diferente a apertura
        resumen_boton: async(_, { fechaInicial, fechaFinal }) => {
            const client = await pool.connect();

            try {
                
                const query = `
                    SELECT COUNT(*) FROM tblog WHERE name_event <> 'apertura'
                    AND date >= $1 AND date <= $2
                `;
                const values = [fechaInicial, fechaFinal]
                const result = await client.query(query, values);
                const count = result.rows[0].count;

                const secondQuery = `
                    SELECT COUNT(*) FROM tblog WHERE name_event = 'apertura'
                    AND date >= $1 AND date <= $2
                `
                const resultados = await client.query(secondQuery, values);
                const cantidad =  resultados.rows[0].count;

                return {
                    status: 200,
                    mensaje: "resumen de datos",
                    clisk: count, 
                    aperturas: cantidad
                }

            } catch (error) {
                return {
                    status: 500,
                    mensaje: 'ocurrio un error en el servicio resumen_boton:',
                    error
                }
            }finally {
                client.release();
            }
        },

        //query de consulta donde traera todos los datos de tblog por fecha
        lista_service: async(_, { fechaInicial, fechaFinal }) => {
            const cliente = await pool.connect();

            try {
                const query = `
                    SELECT * FROM tblog WHERE date >= $1 AND date <= $2
                    ORDER BY date ASC
                `;
                const values = [fechaInicial, fechaFinal];
                const result = await cliente.query(query, values);
                const datos = result.rows;
                return {
                    status: 200,
                    mensaje: "lista de datos",
                    datos
                }
                
            } catch (error) {
                return {
                    status: 500,
                    mensaje: 'ocurrio un error en el servicio lista_service:',
                    error
                }
            }finally {
                cliente.release();
            }
        },

        //esta query hace la consulta la cantidad de veces que esta un boton
        estadistica_service: async (_, { fechaInicial, fechaFinal }) => {
            const client = await pool.connect();
            
            try {

                const query = `
                    SELECT name_event, COUNT(*) AS count
                    FROM tblog
                    WHERE date >= $1 AND date <= $2
                    GROUP BY name_event;
                `;
                const values = [fechaInicial, fechaFinal];
                const result = await client.query(query, values);
                const data = result.rows;
                let total = 0;
                const estadisticas = {};

                for (const row of data) {
                  estadisticas[row.name_event] = row.count;
                  total += parseInt(row.count);
                }
            
                return {
                  status: 200,
                  mensaje: "Datos disponibles",
                  estadisticas,
                  total
                };
                
            } catch (error) {
                return {
                    statue: 500,
                    mensaje: 'Ocurrio un error en el sevicion estadisticas_service:',
                    error
                }
            }finally{
                client.release();
            }
        }
    },

    Mutation: {
        //este query agrega un nuevo click a la base de datos
        agregar_boton: async(_,{id_user, name_event}) => {
            const client = await pool.connect();

            try {
                const query = `
                    INSERT INTO tblog(id_user, name_event)
                    VALUES($1, $2)
                `;
                const values = [id_user, name_event];
                const result = await client.query(query, values);

                if (result.rowCount > 0) {
                    return {
                        status: 200,
                        mensaje: 'click agregado'
                    };
                }
                
            } catch (error) {
                 return {
                    status: 500,
                    mensaje: 'No se pudo agregar el nuevo click:',
                    error
                }
            }finally{
                client.release();
            }
        }
    }
}

//esta funcion me da la cantidad de clicks y aperturas que hay por fechas
const datos_metricas = async(req, res) => {

    const { fechaInicial, fechaFinal } = req.body

    if(!fechaInicial || !fechaFinal){
        return res.status(400).json({
            status: 400,
            mensaje: 'las fechas son requeridas'
        })
    };

    const context = {}; // Puedes ajustar el contexto si es necesario

    const resumen = await resolvers.Query.resumen_boton(
      null,
      { fechaInicial: fechaInicial, fechaFinal: fechaFinal },
      context
    );
  
    res.send(resumen)
}

// esta funcion hace el login
const login = async(req, res) => {
    const { namesuser, password } = req.body

    if(!namesuser || !password){
        return res.status(400).json({
            status: 400,
            mensaje: 'los campos no pueden estar vacios'
        })
    };

    const user = await resolvers.Query.usuarios(null,
        {namesuser, password}    
    )

    res.send(user)
}

//esta funcion agrega los nuevos clicks
const nuevo_boton = async(req, res) => {
    const { id_user, name_event } = req.body;

    if(!id_user || !name_event){
        return res.status(400).json({
            status: 400,
            mensaje: 'No puedes enviar campos vacios'
        })
    };

    const add_boton = await resolvers.Mutation.agregar_boton(null,
        {id_user, name_event}
    );

    res.send(add_boton);
}

//esta función me trae todos los datos por fecha
const lista_service = async(req, res) => {
    const { fechaInicial, fechaFinal } = req.body;

    if(!fechaInicial || !fechaFinal){
        return res.status(400).json({
            status: 400,
            mensaje: 'las fechas son requeridas'
        })
    };

    const lista = await resolvers.Query.lista_service(null, {
        fechaInicial, fechaFinal
    });
    res.send(lista);
};

//esta es la función que me dice la cantidad de veces que esta un boton en la base de datos
const estadistica_service = async(req, res) => {
    const { fechaInicial, fechaFinal } = req.body

    if(!fechaInicial || !fechaFinal){
        return res.status(400).json({
            status: 400,
            mensaje: 'las fechas son requeridas'
        })
    };

    const data = await resolvers.Query.estadistica_service(null, {
        fechaInicial, fechaFinal
    });
    res.send(data)
}

module.exports = { 
    datos_metricas, 
    login, nuevo_boton, 
    lista_service ,
    estadistica_service
}
