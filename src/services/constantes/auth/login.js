const { resolvers } = require('../../graphqlMetodos/resolversMetodos')

// esta funcion hace el login
const login = async(req, res) => {
    const { namesuser, password } = req.body

    if(!namesuser || !password){
        return res.status(400).json({
            status: 400,
            mensaje: 'los campos no pueden estar vacios'
        })
    };

    const user = await resolvers.Query.usuarios(null,
        {namesuser, password}    
    )

    res.send(user)
}

module.exports = { login }