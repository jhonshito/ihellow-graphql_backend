const { resolvers } = require('../../graphqlMetodos/resolversMetodos')

//esta es la función que me dice la cantidad de veces que esta un boton en la base de datos
const estadistica_service = async(req, res) => {
    const { id_landing, fechaInicial, fechaFinal } = req.body;

    if(!id_landing){
        return res.status(400).json({
          status: 400,
          mensaje: 'El id de la landing es requerida'
        });
    }

    const data = await resolvers.Query.estadistica_service(null, {
        id_landing, fechaInicial, fechaFinal
    });
    res.send(data)
}

module.exports = { estadistica_service }