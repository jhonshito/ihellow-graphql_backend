const { resolvers } = require('../../graphqlMetodos/resolversMetodos')

const all_cards = async(req, res) => {

    const {id} = req.body

    if(!id){
        return res.status(400).json({
            status: 400,
            mensaje: 'El id del company es requerido.'
        })
    }

    const data = await resolvers.Query.cards_list(null, {fid_company: id});
    res.send(data);

}

module.exports = {all_cards}