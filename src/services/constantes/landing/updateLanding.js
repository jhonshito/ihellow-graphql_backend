const { resolvers } = require('../../graphqlMetodos/resolversMetodos');
const { convertirToJson } = require("./mutacionJson");


const update_landing = async(req, res) => {
    const { alias, url, seo, pagina_web,linkendin,instagram,facebook,twitter,tiktok,canal_youtube,enlace1,enlace2,enlace3,ciudad,barrio,direccion, recomendacion_card
    } = req.body

    const parameters = convertirToJson(pagina_web,linkendin,instagram,facebook,twitter,tiktok,canal_youtube,enlace1,enlace2,enlace3,ciudad,barrio,direccion, recomendacion_card );

    const respuesta = await resolvers.Mutation.updateLanding(null, {alias, url, seo, parameters});
    res.send(respuesta)
}

module.exports = { update_landing }
