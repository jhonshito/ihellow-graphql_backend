const { pool } = require('../../config/database/db');
const cloudinary = require('../../config/cloudinary/cloundi');

//querys de graphql
const resolvers = {
    Query: {

        //login
        usuarios: async(_, { namesuser, password }) => {
            const client = await pool.connect();

            try {

                const queryRole = `
                    SELECT sp_role($1, $2)
                `;
                const valueRole = [namesuser, password];
                const resultRole = await client.query(queryRole, valueRole);
                const role = resultRole.rows[0];

                if(role.sp_role){

                    const query_user = `
                        SELECT * FROM tbuser WHERE login = $1 AND password = $2
                    `;
                    const value_user = [namesuser, password];
                    const result_user = await client.query(query_user, value_user);
                    const result = result_user.rows[0];

                    const empresario_query = `
                        SELECT id, name FROM tbcompany where id_user = $1;
                    `;
                    const empresario_value = [result.id];
                    const empresario_result = await client.query(empresario_query, empresario_value);
                    const empresario = empresario_result.rows[0];

                    let logoUrl = result.logo

                    // Buscar la imagen en Cloudinary por ID del usuario
                    const cloudinaryResult = await cloudinary.search
                    .expression(`public_id:${result.id}`)
                    .execute();

                    if (cloudinaryResult.total_count > 0) {
                        // Obtener la URL de la imagen encontrada en Cloudinary
                        logoUrl = cloudinaryResult.resources[0].secure_url;
                    }

                    if(!empresario){
                        return {
                            status: 404,
                            mensaje: 'El empresario no existe'
                        }
                    }

                    return {
                        status: 200,
                        mensaje: 'Empresario',
                        data: {
                            id: result.id,
                            id_company: empresario.id,
                            names: result.names,
                            city: result.city,
                            role: result.role,
                            img: logoUrl,
                            country: result.country,
                            phone: result.phone,
                            token: result.token,
                            name_company: empresario.name
                        }
                    }

                }else {

                    const query = `
                        SELECT a.id,a.role,a.names,a.logo as avatar,b.id as id_card,c.id as id_landing
                        FROM tbuser a,tbcard b,tblanding c
                        WHERE a.login = $1
                        AND a.password = $2
                        AND a.id=b.id_user
                        AND b.fid_landing=c.id;
                    `;

                    const values = [namesuser, password];
                    const result = await client.query(query, values);
                    const usuario = result.rows[0];

                    let logoUrl = usuario.avatar

                    // Buscar la imagen en Cloudinary por ID del usuario
                    const cloudinaryResult = await cloudinary.search
                    .expression(`public_id:${usuario.id}`)
                    .execute();

                    if (cloudinaryResult.total_count > 0) {
                        // Obtener la URL de la imagen encontrada en Cloudinary
                        logoUrl = cloudinaryResult.resources[0].secure_url;
                    }

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
                        auth: true,
                        data: {
                            img: logoUrl,
                            id: usuario.id,
                            id_card: usuario.id_card,
                            id_landing: usuario.id_landing,
                            names: usuario.names,
                            role: usuario.role
                        }
                      };        
                }


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
        resumen_boton: async(_, { id_landing, fechaInicial, fechaFinal }) => {
            const client = await pool.connect();

            try {

                if(!fechaInicial || !fechaFinal){
                    const query = `
                        SELECT COUNT(*) FROM tblog WHERE fid_landing = $1 AND name_event <> 'apertura' AND date = cast(now() as date)
                    `;
                    const valueLanding = [id_landing];

                    const result = await client.query(query, valueLanding);
                    const count = result.rows[0].count;

                    const secondQuery = `
                        SELECT COUNT(*) FROM tblog WHERE fid_landing = $1 AND name_event = 'apertura' AND date = cast(now() as date)
                    `;

                    const resultados = await client.query(secondQuery, valueLanding);
                    const cantidad =  resultados.rows[0].count;

                    return {
                        status: 200,
                        mensaje: "resumen de datos",
                        clisk: count, 
                        aperturas: cantidad
                    }
                }
                
                const query = `
                    SELECT COUNT(*) FROM tblog WHERE fid_landing = $1 AND name_event <> 'apertura'
                    AND date >= $2 AND date <= $3
                `;
                const values = [id_landing, fechaInicial, fechaFinal]
                const result = await client.query(query, values);
                const count = result.rows[0].count;

                const secondQuery = `
                    SELECT COUNT(*) FROM tblog WHERE fid_landing = $1 AND name_event = 'apertura'
                    AND date >= $2 AND date <= $3
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
        lista_service: async(_, { id_landing, fechaInicial, fechaFinal }) => {
            const cliente = await pool.connect();

            try {

                if(!fechaInicial || !fechaFinal){
                    const query = `
                        SELECT * FROM tblog WHERE fid_landing = $1 AND date = cast(now() as date)
                    `;

                    const listaValue = [id_landing];

                    const result = await cliente.query(query, listaValue);
                    const datos = result.rows;
                    return {
                        status: 200,
                        mensaje: "lista de datos",
                        datos
                    }
                }

                const query = `
                    SELECT * FROM tblog WHERE fid_landing = $1 AND date >= $2 AND date <= $3
                    ORDER BY date ASC
                `;
                const values = [id_landing, fechaInicial, fechaFinal];
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
        estadistica_service: async (_, { id_landing, fechaInicial, fechaFinal }) => {
            const client = await pool.connect();
            
            try {

                if(!fechaInicial || !fechaFinal){
                    const query = `
                        SELECT name_event, COUNT(*) AS count
                        FROM tblog
                        WHERE fid_landing = $1 AND date = cast(now() as date)
                        GROUP BY name_event;
                    `;
                    const valueEstadisticas = [id_landing];
                    const result = await client.query(query, valueEstadisticas);
                    const data = result.rows;
                    let total = 0;
                    const estadisticas = {};

                    for (const row of data) {
                      estadisticas[row.name_event] = row.count;
                      total += parseInt(row.count);
                    }

                    const estadisticasArray = Object.entries(estadisticas).map(([key, value]) => {
                        const porcentaje = (value / total) * 100;
                        return { nombre: key, cantidad: parseInt(value), porcentaje: parseFloat(porcentaje.toFixed(2)) };
                    });
            
                    return {
                      status: 200,
                      mensaje: "Datos disponibles",
                      estadisticasArray,
                      total
                    };
                }

                const query = `
                    SELECT name_event, COUNT(*) AS count
                    FROM tblog
                    WHERE fid_landing = $1 AND date >= $2 AND date <= $3
                    GROUP BY name_event;
                `;
                const values = [id_landing, fechaInicial, fechaFinal];
                const result = await client.query(query, values);
                const data = result.rows;
                let total = 0;
                const estadisticas = {};

                for (const row of data) {
                  estadisticas[row.name_event] = row.count;
                  total += parseInt(row.count);
                }

                const estadisticasArray = Object.entries(estadisticas).map(([key, value]) => {
                    const porcentaje = (value / total) * 100;
                    return { nombre: key, cantidad: parseInt(value), porcentaje: parseFloat(porcentaje.toFixed(2)) };
                });
            
                return {
                  status: 200,
                  mensaje: "Datos disponibles",
                  estadisticasArray,
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
        },

        // traer la cartas de la compañia
        cards_list: async(_, {fid_company}) => {
            
            try {
                const client = await pool.connect();

                const card_query = `
                    SELECT b.id id_card, b.id_user, b.start_date,b.end_date,b.addresses_delivery,b.title,b.logo,b.side_a,b.side_b,b.qr,
                    b.fid_landing id_landing,c.alias,c.url,c.start_date,c.end_date,c.seo,c.parameters, d.names, d.logo
                    FROM tbcompanycards a, tbcard b,tblanding c, tbuser d
                    WHERE a.fidcompany= $1
                    AND a.fidcard=b.id
                    AND b.fid_landing=c.id
                    AND d.id = b.id_user
                `;

                const card_value = [fid_company];
                const card_result = await client.query(card_query, card_value)
                const cards = card_result.rows;

            client.release();

            return {
                status: 200,
                mensaje: 'All cards',
                cards
            }

                
            } catch (error) {
                return {
                    status: 500,
                    mensaje: 'Ocurrio un error.',
                    error
                }
            }

        },

        list_card_by_id: async(_, {id_user}) => {
            try {
                const client = await pool.connect();
                const query = `
                    SELECT * FROM tbcard WHERE id_user = $1
                `;
                const value = [id_user];
                const list_result = await client.query(query, value);
                const result = list_result.rows

                client.release();

                return {
                    status: 200,
                    mensaje: 'List',
                    result
                }
                
            } catch (error) {
                return {
                    status: 500,
                    mensaje: 'Ocurrio un error',
                    error
                }
            }
        },

        list_landing_by_id: async(_, {id_card}) => {

            try {
                const client = await pool.connect();
                const query = `
                    SELECT * FROM tblanding WHERE id = $1
                `;
                const value = [id_card];
                const result_landing = await client.query(query, value);
                const result = result_landing.rows;

                client.release();

                if(result.length <= 0){
                    return {
                        status: 404,
                        mensaje: 'No hay datos de landing'
                    }
                }

                return {
                    status: 200,
                    mensaje: 'List landing',
                    result
                }
                
            } catch (error) {
                return {
                    status: 500,
                    mensaje: 'Ocurrio un error',
                    error
                }
            }
        },

        lis_campany_by_id: async(_, {id_user, role}) => {

            try {
                const client = await pool.connect();

                if(role !== true){
                    return {
                        mensaje: 'No tienes permiso para esta funcion.'
                    }
                }

                const query = `
                    SELECT * FROM tbcompany WHERE id_user = $1
                `;
                const value = [id_user];
                const result_company = await client.query(query, value);
                const result = result_company.rows;

                if(result.length <= 0){
                    return {
                        status: 404,
                        mensaje: 'No hay datos de company'
                    }
                }

                return{
                    status: 200,
                    mensaje: 'Data company',
                    result
                }

                
            } catch (error) {
                return {
                    status: 500,
                    mensaje: 'Ocurrio un error',
                    error
                }
            }
        }
    },

    Mutation: {
        //este query agrega un nuevo click a la base de datos
        agregar_boton: async(_,{fid_landing, name_event}) => {
            const client = await pool.connect();

            try {
                const query = `
                    SELECT PUBLIC.sp_addlog($1, $2)
                `;
                const values = [fid_landing, name_event];
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
        },

        // registrar usuario
        addUser: async(_,{token, email, password, phone, city, country, name}) => {
            const client = await pool.connect();

            try {

                const query = `
                    SELECT * FROM tbuser WHERE login = $1
                `;
                const value = [email]
                const result = await client.query(query, value);
                const usuario = result.rows[0];
                if(usuario){
                    return {
                        status: 400,
                        mensaje: 'Ya existe alguien registrado con tu correo electronico'
                    }
                }else {
                    const querys = `
                        SELECT sp_adduser($1, $2, $3, $4, $5, $6, $7) AS result
                    `;
                    const values = [token, email, password, phone, city, country, name];
                    const results = await client.query(querys, values);
                    const user = results.rows[0].result;

                    if(user){

                        const queryConsult = `
                            SELECT id_user, fid_landing FROM tbcard WHERE id = $1
                        `;
                        const valueConsult = [user]
                        const result = await client.query(queryConsult, valueConsult);
                        const card = result.rows[0];

                        const queryUser = `
                            SELECT * FROM tbuser WHERE id = $1
                        `;

                        const valueUser = [card.id_user]
                        const resultUser = await client.query(queryUser, valueUser);
                        const usuario = resultUser.rows[0];

                        return {
                            status: 200,
                            mensaje: 'Usuario registrado.',
                            data: {
                                id: usuario.id,
                                token: usuario.token,
                                phone: usuario.phone,
                                role: usuario.role,
                                logo: usuario.logo,
                                city: usuario.city,
                                country: usuario.country,
                                names: usuario.names,
                                id_landing: card.fid_landing
                            }
                            // usuario
                        }
                    }else {
                        return {
                            status: 404,
                            mensaje: 'Usuario no registrado'
                        }
                    }
                }
                
            } catch (error) {
                return {
                    status: 500,
                    mensaje: 'ocurrio un error el servicio del login:',
                    error
                }
            }finally {
                client.release();
            }
        },

        add_fotoPerfil: async(_, {id, tempFilePath}) => {
            const client = await pool.connect();

            try {

                const uploaded = await cloudinary.uploader.upload(tempFilePath, {
                    public_id: id,
                    overwrite: true
                });
                const { public_id, url } = uploaded;

                const updateQuery = `
                  UPDATE tbuser
                  SET logo = $1
                  WHERE id = $2;
                `;
                const updateValues = [url, id];
                await client.query(updateQuery, updateValues);

                const selectQuery = `
                  SELECT *
                  FROM tbuser
                  WHERE id = $1;
                `;
                const selectValues = [id];
                const result = await client.query(selectQuery, selectValues);
                const updatedUser = result.rows[0];

                if (!updatedUser) {
                  return {
                    status: 400,
                    mensaje: 'No se encontró el usuario',
                  };
                }

                return {
                  status: 200,
                  mensaje: 'Imagen agregada exitosamente',
                  img: url,
                };
                
            } catch (error) {
                return {
                    status: 500,
                    mensaje: 'Ocurrio un error',
                    error
                }
            }finally{
                client.release();
            }
        },

        // esta query agrega una nueva landing
        addLanding: async(_, { alias, url, start_date, end_date, seo, parameters }) => {
            
            try {
                const client = await pool.connect();

                const query = `
                    SELECT * FROM tblanding WHERE url = $1
                `;
                const value = [url]
                const result = await client.query(query, value);
                const usuario = result.rows[0];

                if(usuario){
                    return {
                        status: 404,
                        mensaje: 'Ya existe alguien con la url que ingresaste'
                    }
                }else {
                    const querys = `
                        INSERT INTO tblanding(alias, url, start_date, end_date, seo, parameters) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
                    `;
                    const values = [alias, url, start_date, end_date, seo, parameters];
                    const results = await client.query(querys, values);
                    const landing = results.rows[0];

                    if(landing){
                        return {
                            status: 200,
                            mensaje: 'Landing agragada',
                        }
                    }else {
                        return {
                            status: 404,
                            mensaje: 'Landing no registrada'
                        }
                    }

                }
                
            } catch (error) {
                return {
                    status: 500,
                    mensaje: 'Ocurrio un error',
                    error
                }
            }
        },
        // esta query agrega una carta
        addCard: async(_,{ id_user, start_date, end_date, addresses_delivery, fid_landing, title, logo, side_a, side_b, qr, url_landing }) => {

            const client = await pool.connect();
            try {

                const querySelect = `
                    SELECT id FROM tblanding WHERE url = $1
                `;
                const valueSelect = [url_landing];
                const result = await client.query(querySelect, valueSelect);
                const updatedUser = result.rows[0];

                const querys = `
                INSERT INTO tbcard(id_user, start_date, end_date, addresses_delivery, fid_landing, title, logo, side_a, side_b, qr) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
            `;
            const values = [id_user, start_date, end_date, addresses_delivery, fid_landing, title, logo, side_a, side_b, qr];
            const results = await client.query(querys, values);
            const card = results.rows[0];

            if(card){
                return {
                    status: 200,
                    mensaje: 'Card agragada',
                }
            }else {
                return {
                    status: 404,
                    mensaje: 'Card no registrada'
                }
            }
                
            } catch (error) {
                return {
                    status: 500,
                    mensaje: 'Ocurrio un error',
                    error
                }
            }finally{
                client.release();
            }
     
    
        }
    }

}

module.exports = { resolvers }