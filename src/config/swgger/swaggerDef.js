const swaggerDef = {
    openapi: "3.0.1",
    info: {
        title: "API DE ADMINISTRACION DE IHELLOW",
        description: "Esta api esta hecha para poder ver la interatividad del usuario en la pagina de ihellow de presentación",
        version: "1.0.0"
    },
    servers: [
        {
            url: "http://localhost:5000"
        }
    ]
};

module.exports = swaggerDef