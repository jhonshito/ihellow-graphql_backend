const { resolvers } = require('../../graphqlMetodos/resolversMetodos');
const { convertirToJson } = require("./mutacionJson");


const update_landing = async(req, res) => {
    const { id_landing, alias, url, seo, linkendin,instagram,facebook,twitter,tiktok,canal_youtube,enlace1,enlace2,enlace3,ciudad,barrio,direccion, recomendacion_card
    } = req.body

    if(!id_landing){
        return res.status(400).json({
            status: 400,
            mensaje: 'El id de la landing es requerido.'
        });
    }

    const parameters = convertirToJson(linkendin,instagram,facebook,twitter,tiktok,canal_youtube,enlace1,enlace2,enlace3,ciudad,barrio,direccion, recomendacion_card );

    const respuesta = await resolvers.Mutation.updateLanding(null, {id_landing, alias, url, seo, parameters});
    res.send(respuesta)
}

module.exports = { update_landing }
