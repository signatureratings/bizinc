const pool = require('./connect');

const createUser = async (userID, username, email, password) => {
  try {
    const query = {
      text: 'INSERT INTO users(userID, name, email, password) VALUES($1, $2, $3, $4) RETURNING *',
      values: [userID, username, email, password],
    };
    const result = await pool.query(query);
    return result.rows[0];
}
catch (error) {
    console.log(error);
    throw error;
  }
}

const getUserByEmail = async (email) => {
    try {
        const query = {
          text: 'SELECT * FROM users WHERE email = $1',
          values: [ email],
        };
        const result = await pool.query(query);
        return result.rows[0];
    }
    catch (error) {
        console.log(error);
    }
}

const getUserById = async (id) => {
    try {
        const query = {
          text: 'SELECT * FROM users WHERE userID = $1',
          values: [ id],
        };
        const result = await pool.query(query);
        return result.rows[0];
    }
    catch (error) {
        console.log(error);
    }
}

const getAllUsers = async () => {
    try {
        const query = {
          text: 'SELECT * FROM users',
        };
        const result = await pool.query(query);
        return result.rows;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
createUser,
getUserByEmail,
getUserById,
getAllUsers
};
