const { resolvers } = require('../../graphqlMetodos/resolversMetodos')

//esta función me trae todos los datos por fecha
const lista_service = async(req, res) => {
    const { id_landing, fechaInicial, fechaFinal } = req.body;

    if(!id_landing){
        return res.status(400).json({
          status: 400,
          mensaje: 'El id de la landing es requerida'
        });
    }

    const lista = await resolvers.Query.lista_service(null, {
        id_landing, fechaInicial, fechaFinal
    });
    res.send(lista);
};

module.exports = { lista_service }