const { resolvers } = require('../../graphqlMetodos/resolversMetodos');

const update_pass = async(req, res) => {
    const { id, password } = req.body;

    if(!id || !password){
        return res.status(400).json({
            status: 400,
            mensaje: 'Los datos son requeridos.'
        })
    };

    const response = await resolvers.Mutation.updatePass(null, { id, password });
    res.send(response);
};


module.exports = { update_pass };
