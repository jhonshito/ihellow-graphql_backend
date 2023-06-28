const { resolvers } = require('../../graphqlMetodos/resolversMetodos')

const grafica = async(req, res) => {
    const { id_landing, fechaInicial, fechaFinal } = req.body;

    if(!id_landing){
        return res.status(400).json({
            status: 400,
            mensaje: 'El id de la landing es requerida'
        })
    }

    const data = await resolvers.Query.grafica_data(null, {id_landing, fechaInicial, fechaFinal});
    res.send(data);

}

module.exports = { grafica }