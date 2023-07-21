const { resolvers } = require('../../graphqlMetodos/resolversMetodos');

const alias_landing = async(req, res) => {
    const {id} = req.params
    const data = await resolvers.Query.list_card_by_id(null, {id_user: id});

    if(!data){
        return res.status(404).json({
            status: 404,
            mensaje: 'No hay landing disponible'
        })
    }

    const result = await resolvers.Query.list_landing_by_id(null, {id_card: data.result.id});
    res.send(result);
}

module.exports = {alias_landing};