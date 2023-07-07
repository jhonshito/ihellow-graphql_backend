const { resolvers } = require('../../graphqlMetodos/resolversMetodos')

// esta funcion hace el login
const login = async(req, res) => {
    const { namesuser, password, token, name, photo, ismetodo } = req.body

    if(!namesuser){
        return res.status(400).json({
            status: 400,
            mensaje: 'El correo es requerido'
        })
    };


    if(ismetodo == 'login'){

        if(!password){
            return res.status(400).json({
                status: 400,
                mensaje: 'El password es requerido.'
            })
        }

        const user = await resolvers.Query.usuarios(null,
            {namesuser, password, token}    
        )
        return res.send(user)
    }

    if(ismetodo == 'google'){

        if(!token){
            return res.status(400).json({
                status: 400,
                mensaje: 'El token de firebase es requerido.'
            })
        }

        const user = await resolvers.Query.loginWidthFirebas(null,
            {email: namesuser, token}    
        )
        if(!user){
            const user = await resolvers.Mutation.addUserForGoogle(null, {token, email: namesuser, name, photo});
            console.log(photo)
            res.send(user);
        }else {

            return res.send(user)
        }
        // console.log(res)
    }

}

module.exports = { login }