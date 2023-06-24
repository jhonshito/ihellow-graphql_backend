const { resolvers } = require('../../graphqlMetodos/resolversMetodos')

//esta funcion me da la cantidad de clicks y aperturas que hay por fechas
const datos_metricas = async(req, res) => {

    const { id_landing, fechaInicial, fechaFinal } = req.body;

    if(!id_landing){
      return res.status(400).json({
        status: 400,
        mensaje: 'El id de la landing es requerida'
      });
    }

    const context = {}; // Puedes ajustar el contexto si es necesario

    const resumen = await resolvers.Query.resumen_boton(
      null,
      { id_landing: id_landing, fechaInicial: fechaInicial, fechaFinal: fechaFinal },
      context
    );
  
    res.send(resumen)
}

module.exports = { datos_metricas }