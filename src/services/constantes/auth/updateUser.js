const { resolvers } = require('../../graphqlMetodos/resolversMetodos');


const update_usuario = async(req, res) => {
    const { id, name, country, phone, city } = req.body;

    if(!id){
        return res.status(400).json({
            status: 400,
            mensaje: 'El id del usuario es requerido.'
        })
    }

    const response = await resolvers.Mutation.updateProfile(null, {id, name, country, phone, city});
    res.send(response);
}

module.exports = { update_usuario };
