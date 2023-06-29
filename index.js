const swagger = require("./src/config/swgger/swagger.js");
const cors = require("cors");
const express = require('express');
require("dotenv").config()
const fileUpload = require('express-fileupload');
const rutas = require('./src/services/routers/home.router');

const app = express();

// const corsOptions = {
//     origin: 'http://localhost:5173', // Cambia esto con el dominio de tu aplicación
//     methods: 'GET,POST, PUT',
//     allowedHeaders: 'Content-Type,Authorization',
//   };

// middlewares
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));

app.use(express.json());
swagger(app);
app.use('/api/v1', rutas);

// puerto
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`servidor andando en el puerto ${PORT}`)
})
