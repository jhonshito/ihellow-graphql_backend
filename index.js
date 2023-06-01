//const { ApolloServer } = require('apollo-server');
//const { typeDefs } = require('./schema')
//const { datos_metricas } = require('./resolvers');
//const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("./models/modelo");
const { resolvers, datos_metricas } = require("./resolversArchivo/resolvetion");
const swagger = require("./swagger");
const cors = require("cors");
const express = require('express');

const app = express();
swagger(app);
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use(require('./routers/home.router'))

//app.get('/metricas', (req, res) => {
    //const data = datos_metricas();
    //res.json(data);

//});

//app.get('/metricas', datos_metricas);

//const server = new ApolloServer({ typeDefs, resolvers });

//app.use('/graphql', graphqlHTTP({
    //schema: schema,
    //rootValue: resolvers
//}))

app.listen(5000, () => {
    console.log('servidor andando en el puerto 5000')
})

//server.listen().then(({ url }) => {
    //console.log(`Servidor andando en ${url}`)
//})
