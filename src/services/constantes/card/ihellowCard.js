const { resolvers } = require('../../graphqlMetodos/resolversMetodos');
const moment = require('moment');


const addCard = async(req, res) => {

    const { id_user, addresses_delivery, fid_landing, title, logo, side_a, side_b, qr, url_landing } = req.body;

    // Obtener la fecha actual
    const fechaActual = moment();

    // Crear una copia independiente de la fecha actual
    const fechaFutura = fechaActual.clone().add(1, 'year');

    // Obtener el día de la semana de la fecha futura
    const end_date = fechaFutura.format('YYYY/MM/DD');

    // Obtener la fecha actual en el formato deseado
    const start_date = fechaActual.format('YYYY/MM/DD');

    if(!id_user || !start_date || !end_date || !addresses_delivery || !fid_landing || !title || !logo || !side_a || !side_b || !qr || !url_landing){
        return res.status(400).json({
            status: 400,
            mensaje: 'Todos los campos son requeridos'
        })
    };

    const card = await resolvers.Mutation.addCard(null, { id_user, start_date, end_date, addresses_delivery, fid_landing, title, logo, side_a, side_b, qr, url_landing });

    res.send(card);
};

module.exports = {addCard}