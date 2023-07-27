const { resolvers } = require('../../graphqlMetodos/resolversMetodos');

const update_card = async(req, res) => {
    const {id_card, title, addresses, side_a, side_b, logo_card, qr} = req.body

    if(!id_card || !title || !addresses || !side_a || !side_b || !logo_card || !qr){
        return res.status(400).json({
            status: 400,
            mensaje: 'Los datos son requeridos',
            update: false
        })
    }

    const respuesta = await resolvers.Mutation.updateCard(null, {id_card, title, addresses, side_a, side_b, logo_card, qr});

    res.send(respuesta);

}

module.exports = { update_card }