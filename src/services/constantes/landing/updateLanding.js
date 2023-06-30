const { resolvers } = require('../../graphqlMetodos/resolversMetodos');
const { convertirToJson } = require("./mutacionJson");


const update_landing = async(req, res) => {
    const { id_landing, alias, url, seo, parameter } = req.body

    if(!id_landing){
        return res.status(400).json({
            status: 400,
            mensaje: 'El id de la landing es requerido.'
        });
    }

    const jsonResult = convertirToJson(parameter);
    // const data = JSON.parse(jsonResult)

    // console.log(jsonResult);
    // res.send(jsonResult);

    const respuesta = await resolvers.Mutation.updateLanding(null, {id_landing, alias, url, seo, parameters: jsonResult});
    res.send(respuesta)
}

module.exports = { update_landing }
