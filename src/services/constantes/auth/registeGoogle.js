const { resolvers } = require('../../graphqlMetodos/resolversMetodos')

const registe_google = async(req, res) => {
    const {token, email, name, photo} = req.body

    if(!token || !email || !name || !photo){
        return res.status(400).json({
            status: 400,
            mensaje: 'los campos no pueden estar vacios'
        })
    };

    const user = await resolvers.Mutation.addUserForFirebase(null,
        {token, email, name, photo}    
    )

    res.send(user);

};

module.exports = { registe_google }