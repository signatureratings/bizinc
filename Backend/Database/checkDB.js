const pool = require("./connect");

const userTable = "CREATE TABLE IF NOT EXISTS users (userID VARCHAR(100) PRIMARY KEY, name VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, password VARCHAR(100) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
const refresh_tokens = "CREATE TABLE IF NOT EXISTS refresh_tokens (id VARCHAR(100) PRIMARY KEY, userID VARCHAR(50) NOT NULL, token VARCHAR(555) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, expiry_date TIMESTAMP NOT NULL)";
const images = "CREATE TABLE IF NOT EXISTS images (id VARCHAR(50) PRIMARY KEY, userID VARCHAR(50) NOT NULL, title VARCHAR(50) NOT NULL, description VARCHAR(255), image_url VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP) ";
const rawimages = "CREATE TABLE rawimages (id VARCHAR(50) PRIMARY KEY, data BYTEA);"


async function checkDB() {
    try {
        await pool.query(userTable);
        await pool.query(refresh_tokens);
        await pool.query(images);
        await pool.query(rawimages);
        console.log("Database checked");
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

checkDB();