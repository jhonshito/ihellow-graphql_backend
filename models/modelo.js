const { buildSchema } = require('graphql');

const schema = buildSchema(`
    scalar JSON
    type Usuario {
        id: ID!,
        namesuser: String!,
        login: String!,
        password: String!
    }

    type tblog {
        id: ID!,
        id_user: ID!,
        name_event: String!,
        date: String!,
        hour: String!
    }

    type Query {
        usuarios(namesuser: String, password: String): Usuario
        resumen_boton(fechaInicial: String, fechaFinal: String): JSON!
        lista_service(fechaInicial: String!, fechaFinal: String!): [tblog]!
        estadistica_service(fechaInicial: String!, fechaFinal: String!): JSON!
    }

    type Mutation {
        agregar_boton(id_user: ID, name_event: String): JSON!
    }
`);

module.exports = { schema }
