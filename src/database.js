const { Client } = require('pg');

const clientConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};

const query = async (sqlQuery) => {

    const client = new Client(clientConfig);

    // console.log({ clientConfig });

    return client.connect()
        .then(() => client.query(sqlQuery))
        .then(result => ({
            query: result.command,
            results: result.rows,
            resultCount: result.rowCount,
            success: true,
            message: 'Query successful'
        })).catch(error => ({
            query: 'ERROR',
            results: [],
            resultCount: 0,
            success: false,
            message: error.message
        })).finally(() => {
            client.end();
        });
}

module.exports = {
    query
};