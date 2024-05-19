const Pool = require("./connect");

const uploadimage = async(imageID, imageData)=>{
    try{
        const query = "INSERT INTO rawimages(id, data) VALUES($1, $2)";
        const result = await Pool.query(query, [imageID, imageData]);
        return result.rows;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

const deleteimage = async(imageID)=>{
    try{
        const query = "DELETE FROM rawimages WHERE id = $1";
        const result = await Pool.query(query, [imageID]);
        return result.rows;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

const getimage = async(imageID)=>{
    try{
        const query = "SELECT * FROM rawimages WHERE id = $1";
        const result = await Pool.query(query, [imageID]);
        return result.rows;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

const getListofImages = async(imageIDs)=>{
    try{
        const query = "SELECT * FROM rawimages WHERE id = ANY($1)";
        const result = await Pool.query(query, [imageIDs]);
        return result.rows;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

const updateimage = async(imageID, imageData)=>{
    try{
        const query = "UPDATE rawimages SET data = $2 WHERE id = $1";
        const result = await Pool.query(query, [imageID, imageData]);
        return result.rows;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

const insertRecord = async(id, userID, title, description, imageid)=>{
try{
    const query = "INSERT INTO images(id, userID, title, description, image_url) VALUES($1, $2, $3, $4, $5) RETURNING *";
    const result = await Pool.query(query, [id, userID, title, description, imageid]);
    return result.rows;
}
catch(err){
    console.log(err);
    throw err;
}
}

const deleteRecord = async(id)=>{
    try{
        const query = "DELETE FROM images WHERE id = $1";
        const result = await Pool.query(query, [id]);
        return result.rows;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

const updateRecord = async(id, title, description, updated_at)=>{
    try{
        const query = "UPDATE images SET title = $2, description = $3, updated_at = $4 WHERE id = $1 RETURNING *";
        const result = await Pool.query(query, [id, title, description, updated_at]);
        return result.rows;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

const getRecord = async(id)=>{
    try{
        const query = "SELECT * FROM images WHERE id = $1";
        const result = await Pool.query(query, [id]);
        return result.rows;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

const getUsersRecords = async(userID)=>{
    try{
        const query = "SELECT * FROM images WHERE userID = $1";
        const result = await Pool.query(query, [userID]);
        return result.rows;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}



module.exports = {updateimage, uploadimage, deleteimage, getimage, getListofImages, insertRecord, deleteRecord, updateRecord, getRecord, getUsersRecords};