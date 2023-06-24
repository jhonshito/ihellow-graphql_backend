const { resolvers } = require('../../graphqlMetodos/resolversMetodos');
const moment = require('moment');

const addLanding = async(req, res) => {
    const { alias, url, seo, parameters } = req.body;

    // Obtener la fecha actual
    const fechaActual = moment();

    // Crear una copia independiente de la fecha actual
    const fechaFutura = fechaActual.clone().add(1, 'year');

    // Obtener el día de la semana de la fecha futura
    const end_date = fechaFutura.format('YYYY/MM/DD');

    // Obtener la fecha actual en el formato deseado
    const start_date = fechaActual.format('YYYY/MM/DD');

    // validación de los parametros recibidos
    if(!alias || !url || !seo || !parameters){
        return res.status(400).json({
            status: 400,
            mensaje: 'los campos no pueden estar vacios'
        })
    };

    // validación para las fechas
    if(!start_date || !end_date){
        return res.status(400).json({
            status: 400,
            mensaje: 'No hay fechas'
        })
    };

    const landing = await resolvers.Mutation.addLanding(null, { alias, url, start_date, end_date, seo, parameters });

    res.send(landing);

}

module.exports = { addLanding }
