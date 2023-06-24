const { Pool } = require('pg');

// Configura la conexión a la base de datos PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ihellowdb',
    password: 'postgres',
    port: 5432,
});

module.exports = { pool }