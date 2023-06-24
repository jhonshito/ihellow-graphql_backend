const { resolvers } = require('../../graphqlMetodos/resolversMetodos')

//esta funcion agrega los nuevos clicks
const nuevo_boton = async(req, res) => {
    const { fid_landing, name_event } = req.body;

    if(!fid_landing || !name_event){
        return res.status(400).json({
            status: 400,
            mensaje: 'No puedes enviar campos vacios'
        })
    };

    const add_boton = await resolvers.Mutation.agregar_boton(null,
        {fid_landing, name_event}
    );

    res.send(add_boton);
}

module.exports = { nuevo_boton }