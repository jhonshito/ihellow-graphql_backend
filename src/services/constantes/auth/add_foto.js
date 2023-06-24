const { resolvers } = require('../../graphqlMetodos/resolversMetodos');

const add_foto = async(req, res) => {
    const { id } = req.params
    const file = req.files.file;

    if(!id){
        return res.status(400).json({
            status: 400,
            mensaje: 'El id del usuario es requerido'
        })
    }

    if(!file){
        return res.status(400).json({
            status: 400,
            mensaje: 'La foto es requerida'
        })
    }

    console.log(file);

    const { tempFilePath } = file;

    const foto = await resolvers.Mutation.add_fotoPerfil(null, {id, tempFilePath});
    res.send(foto)

};


module.exports = {add_foto};