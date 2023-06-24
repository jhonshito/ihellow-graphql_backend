const { resolvers } = require('../../graphqlMetodos/resolversMetodos')

// esta función registra un usuario
const register = async(req, res) => {

    const {token, email, phone, password, city, country, name} = req.body
    console.log(token, email, phone, password, city, country, name)

    if(!token || !email || !phone || !password || !city || !country || !name){
        return res.status(400).json({
            status: 400,
            mensaje: 'los campos no pueden estar vacios'
        })
    };

    // let estadoRole = false

    // role == 'empresa' ? estadoRole = true: estadoRole = false

    const user = await resolvers.Mutation.addUser(null,
        {token, email, phone, password, city, country, name}    
    )

    res.send(user)
}

module.exports = { register }