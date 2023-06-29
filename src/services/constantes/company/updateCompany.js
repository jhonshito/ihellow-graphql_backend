const { resolvers } = require('../../graphqlMetodos/resolversMetodos');
const { convertirToJson } = require("../landing/mutacionJson");

const update_company = async(req, res) => {
    const { id_company, name, identify, phones, addresses, country, city, pagina_web,linkedin,instagram,facebook,twitter,tiktok,canal_youtube,enlace1,enlace2,enlace3,ciudad,barrio,direccion, recomendacion_card, logo_company
    } = req.body

    if(!id_company){
        return res.status(400).json({
            status: 400,
            mensaje: 'El id de la company es requerido.'
        });
    }

    const parameters = convertirToJson(pagina_web,linkedin,instagram,facebook,twitter,tiktok,canal_youtube,enlace1,enlace2,enlace3,ciudad,barrio,direccion, recomendacion_card );

    const respuesta = await resolvers.Mutation.updataCompany(null, {id_company, name, identify, phones, addresses, country, city, parameters, logo_company});

    res.send(respuesta);
};

module.exports = { update_company };
