const { resolvers } = require('../../graphqlMetodos/resolversMetodos');

const add_img_card = async(req, res) => {
    const { id } = req.params
    const file = req.files.file

    if(!id){
        return res.status(400).json({
            status: 400,
            mensaje: 'El id de la card es requerido'
        })
    };

    if(!file){
        return res.status(400).json({
            status: 400,
            mensaje: 'La imagen es requerida'
        })
    };

    const { tempFilePath, name } = file;

    const foto = await resolvers.Mutation.add_img_card(null, {id_card: id, tempFilePath, name});
    res.send(foto)
}

module.exports = { add_img_card }
