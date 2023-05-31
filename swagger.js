const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDef = require("./swaggerDef");


const spacs = swaggerJsdoc({
    swaggerDefinition: swaggerDef,
    apis: ["./routers/home.router.js"]
});

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs))
}
