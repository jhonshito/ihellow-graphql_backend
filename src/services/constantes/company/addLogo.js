const { resolvers } = require('../../graphqlMetodos/resolversMetodos');

const add_logo_company = async(req, res) => {
    const { id } = req.params
    const file = req.files.file

    if(!id){
        return res.status(400).json({
            status: 400,
            mensaje: 'El id de la company es requerido'
        })
    };

    if(!file){
        return res.status(400).json({
            status: 400,
            mensaje: 'La imagen es requerida'
        })
    };

    // console.log(file)
    const { tempFilePath, name } = file;

    const imagen = await resolvers.Mutation.add_logo_company(null, {id_company: id, tempFilePath, name});
    res.send(imagen)
}

module.exports = { add_logo_company }
