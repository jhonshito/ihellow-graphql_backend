
function convertirToJson(pagina_web,
    linkendin,
    instagram,
    facebook,
    twitter,
    tiktok,
    canal_youtube,
    enlace1,
    enlace2,
    enlace3,
    ciudad,
    barrio,
    direccion,
    recomendacion_card ){

        const parameters = {
            pagina_web,
        linkendin,
        instagram,
        facebook,
        twitter,
        tiktok,
        canal_youtube,
        enlace1,
        enlace2,
        enlace3,
        ciudad,
        barrio,
        direccion,
        recomendacion_card 
        }

        return parameters

}

module.exports = { convertirToJson }