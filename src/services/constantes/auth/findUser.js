const { resolvers } = require('../../graphqlMetodos/resolversMetodos');

const find_user = async(req, res) => {
    const { id } = req.params

    if(!id){
        return res.status(400).json({
            status: 400,
            mensaje: 'El id del usuario es requerido.',
        });
    }

    const data = await resolvers.Query.dataUsuario(null, {id});
    res.send(data);
}

module.exports = {find_user};