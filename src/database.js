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

    return client.connect().then(async () => {
        const result = await client.query(sqlQuery);
        return {
            query: result.command,
            results: result.rows,
            resultCount: result.rowCount
        };
    }).catch(error => {
        console.error('Error connecting to the database:', error);
    }).finally(() => {
        client.end();
    });
}

module.exports = {
    query
};