const mysql = require('mysql2')
require('dotenv').config()

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})

// // Check if the database exists
// async function checkDatabaseExists(dbName) {
//     const connection = await pool.promise().getConnection();

//     try {
//         const [rows] = await connection.query('SHOW DATABASES LIKE ?', [dbName]);
//         return rows.length > 0;
//     } catch (error) {
//         console.error('Error checking database:', error);
//         throw error;
//     } finally {
//         connection.release();
//     }
// }

// // Create the database if it doesn't exist
// async function createDatabase(dbName) {
//     const connection = await pool.promise().getConnection();

//     try {
//         await connection.query(`CREATE DATABASE \`${dbName}\``);
//         console.log(`Database ${dbName} created successfully.`);
//     } catch (error) {
//         console.error(`Error creating database ${dbName}:`, error);
//         throw error;
//     } finally {
//         connection.release();
//     }
// }

// // Create a new pool that includes the specified database
// function createDatabasePool() {
//     return mysql.createPool({
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         waitForConnections: true,
//         connectionLimit: 10,
//         maxIdle: 10,
//         idleTimeout: 60000,
//         queueLimit: 0,
//         enableKeepAlive: true,
//         keepAliveInitialDelay: 0,
//     });
// }

// const dbName = process.env.DB_DATABASE;

// (async () => {
//     try {
//         const exists = await checkDatabaseExists(dbName);
//         if (exists) {
//             console.log(`Database ${dbName} already exists.`);
//         } else {
//             console.log(`Database ${dbName} does not exist. Creating...`);
//             await createDatabase(dbName);
//         }

//         // Create and export a new pool that includes the database
//         const dbPool = createDatabasePool();
//         module.exports = dbPool;
//     } catch (err) {
//         console.error('Error:', err);
//     }
// })();

module.exports = pool