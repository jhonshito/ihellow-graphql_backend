const { resolvers } = require('../../graphqlMetodos/resolversMetodos');
const { convertirToJson } = require("../landing/mutacionJson");

const update_company = async(req, res) => {
    const { id_company, name, identify, phones, addresses, country, city, parameter, logo_company
    } = req.body

    if(!id_company){
        return res.status(400).json({
            status: 400,
            mensaje: 'El id de la company es requerido.'
        });
    }

    const parameters = convertirToJson(parameter);

    const respuesta = await resolvers.Mutation.updataCompany(null, {id_company, name, identify, phones, addresses, country, city, parameters, logo_company});

    res.send(respuesta);
};

module.exports = { update_company };
