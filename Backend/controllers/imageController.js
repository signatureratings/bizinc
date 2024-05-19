const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');


const {uploadimage, updateimage, getimage, getListofImages, deleteimage, insertRecord, getRecord, getUsersRecords, updateRecord, deleteRecord} = require('../Database/image');

const getAllImages = async (req, res) => {
    try{
        const userID = req.user.userID;
        const data = await getUsersRecords(userID);
        if(data.length === 0){
            return res.json({message: "user Images not found", data: []});
        }
        //console.log(data);

        const imageids = data.map(item => item.image_url);

        let imagesdata = await getListofImages(imageids);
        let imageidmapping = {};
        for(let i = 0; i < data.length; i++){
            let singlerecord = data[i];
            let imageid = singlerecord.image_url;
            let id = singlerecord.id;
            imageidmapping[imageid] = id;
        }
        imagesdata = imagesdata.map(item => {
            item.id = `/images/${imageidmapping[item.id]}`;
            return item;
        });

        res.status(StatusCodes.OK).json({message: "Image fetched successfully", data: imagesdata});
    }
    catch(err){
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
};

const getImage = async (req, res) => {
    try{
        const imageID = req.params.id;
        //console.log(imageID);
        const userID = req.user.userID;
        const data = await getRecord(imageID);
        //console.log(data);
        if(data.length === 0){
            return res.status(204).json({message: "Image not found"});
        }
        //console.log(data);
        const image_id = data[0].image_url;
        if(data[0].userid !== userID){
            return res.status(StatusCodes.FORBIDDEN).json({message: "Unauthorized access to image"});
        }

        const imageData = await getimage(image_id);
        //console.log(imageData);
        res.status(StatusCodes.OK).json({message: "Image fetched successfully", data: {imagepath: `/images/${imageID}`, imagedata: imageData[0].data, title: data[0].title, description: data[0].description, created_at: data[0].created_at, updated_at: data[0].updated_at}});
    }
    catch(err){
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
};

const uploadImage = async (req, res) => {
    try{
    const {title, description, image} = req.body;
    const images = req.files.image;
    const imageData = images.data;

    if(!title){
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Title and description are required"});
    }

    const userID = req.user.userID;
    const imageID = uuidv4();
    const recordID = uuidv4();
    await uploadimage(imageID, imageData);
    await insertRecord(recordID, userID, title, description, imageID);
    res.status(StatusCodes.CREATED).json({message: "Image uploaded successfully", data: {title: title, description: description, imagepath: `/images/${imageID}`}});
    }
    catch(err){
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
};

const updateImage = async (req, res) => {
    try{
        const imageID = req.params.id;
        const userID = req.user.userID;
        const data = await getRecord(imageID);
        if(data.length === 0){
            return res.status(StatusCodes.NOT_FOUND).json({message: "Image not found"});
        }
        if(data[0].userid !== userID){
            return res.status(StatusCodes.FORBIDDEN).json({message: "Unauthorized access to image"});
        }
        console.log(req.body);
        const {title, description, isNewImage} = req.body;
        if(!(title || description || isNewImage)){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Title or description or isNewImage are required"});
        }
        await updateRecord(imageID, title, description, new Date());
        if(isNewImage=='true'){
            const image = req.files.image;
            const imageData = image.data;
            const image_id = data[0].image_url;
            await updateimage(image_id, imageData);
        }
        res.status(StatusCodes.OK).json({message: "Image updated successfully", data: {title: title, description: description, imagepath: `/images/${imageID}`}});
    }
    catch(err){
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
};

const deleteImage = async (req, res) => {
    try{
        const imageID = req.params.id;
        const userID = req.user.userID;
        const data = await getRecord(imageID);
        //console.log(data)
        if(data.length === 0){
            return res.status(StatusCodes.NOT_FOUND).json({message: "Image not found"});
        }
        if(data[0].userid !== userID){
            return res.status(StatusCodes.FORBIDDEN).json({message: "Unauthorized access to image"});
        }
        const image_id = data[0].image_url;
        await deleteimage(image_id);
        await deleteRecord(imageID);
        res.status(StatusCodes.OK).json({message: "Image deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
};

module.exports = {
    getAllImages,
    getImage,
    uploadImage,
    updateImage,
    deleteImage,
}