const Pool = require("./connect")

// Insert a new refresh token
async function insertRefreshToken(id, token, userId, expiryDate) {
    try{
    const query = 'INSERT INTO refresh_tokens (id, token, userID, expiry_date) VALUES ($1, $2, $3, $4)';
    const values = [id, token, userId, expiryDate];
    await Pool.query(query, values);
    }catch(err){
        console.log(err);
        throw err;
    }
  }
  
  // Delete a refresh token
  async function deleteRefreshToken(userID) {
    try{
    const query = 'DELETE FROM refresh_tokens WHERE userID = $1';
    const values = [userID];
    await Pool.query(query, values);
    }catch(err){
        console.log(err);
        throw err;
    }
  }
  
  // Update a refresh token
  async function updateRefreshToken(oldToken, newToken, newExpiryDate) {
    try{
    const query = 'UPDATE refresh_tokens SET token = $1, expiry_date = $2 WHERE token = $3';
    const values = [newToken, newExpiryDate, oldToken];
    await Pool.query(query, values);
    }
    catch(err){
        console.log(err);
        throw err;
    }
  }
  
  // Get a refresh token
  async function getRefreshToken(userID) {
    try{
    const query = 'SELECT * FROM refresh_tokens WHERE userID = $1';
    const values = [userID];
    const result = await Pool.query(query, values);
    return result.rows[0]; // return the first row
    }
    catch(err){
        console.log(err);
        throw err;
    }
  }

module.exports = {insertRefreshToken, deleteRefreshToken, updateRefreshToken, getRefreshToken}