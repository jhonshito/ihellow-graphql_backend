
const { pool } = require('./db')

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
                    throw new Error('Credenciales inválidas');
                }

                return {
                    id: usuario.id,
                    login: usuario.login,
                    namesuser: usuario.namesuser,
                    password: usuario.password
                };

            } catch (error) {
                console.error('Error al agregar usuario:', error);
                throw new Error('No se pudo agregar el usuario');
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

                return {clisk: count, aperturas: cantidad}

            } catch (error) {
                console.error('Error al obtener el resumen de los botones:', error);
                throw new Error('No se pudo obtener el resumen de los botones');
            }finally {
                client.release();
            }
        }
    },

    Mutation: {
        agregar_boton: async(_,{id_user, name_event, date, hour}) => {
            const client = await pool.connect();

            try {
                const query = `
                    INSERT INTO tblog(id_user, name_event, date, hour)
                    VALUES($1, $2, $3, $4)
                `;
                const values = [id_user, name_event, date, hour];
                const result = await client.query(query, values);

                if (result.rowCount > 0) {
                    return {mensaje: 'click agregado'};
                }
                
            } catch (error) {
                console.error('Error al agregar blog:', error);
                throw new Error('No se pudo agregar el blog');
            }finally{
                client.release();
            }
        }
    }
}

const datos_metricas = () => {
    console.log('llamando datos metricas desde servicio graphql');
}

module.exports = { resolvers, datos_metricas }