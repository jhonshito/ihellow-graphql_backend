const { resolvers } = require('../../graphqlMetodos/resolversMetodos');

const sendCorreo = async(req, res) => {
    const { email } = req.body;

    if(!email){
        return res.status(400).json({
            status: 400,
            mensaje: 'El email es requerido.'
        })
    };

    const response = await resolvers.Query.sendEmail(null, {email});
    res.send(response);
};

module.exports = {sendCorreo};
