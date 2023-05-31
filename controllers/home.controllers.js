const { pool } = require('../db');

const login = async(req, res) => {
    const client = await pool.connect();
    const result = await client.query('SELECT COUNT(*) FROM tblog');
    client.release();
    res.json(result.rows);
}

module.exports = {
    login
}