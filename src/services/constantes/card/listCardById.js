const { resolvers } = require('../../graphqlMetodos/resolversMetodos')

const list_card_by_id = async(req, res) => {
    const id = req.params.id

    if(!id){
        return res.status(400).json({
            status: 400,
            mensaje: 'El id es requerido'
        })
    }

    const response = await resolvers.Query.list_card_by_id(null, {
        id_user: id
    });
    res.send(response);
}

module.exports ={list_card_by_id}