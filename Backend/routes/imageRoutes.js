const express = require('express');
const imageRouter = express.Router();

const { authenticateUser } = require('../middleware/authentication');

const {
    getAllImages,
    getImage,
    uploadImage,
    updateImage,
    deleteImage,
} = require('../controllers/imageController');

imageRouter.get('/', authenticateUser, getAllImages);
imageRouter.get('/:id', authenticateUser, getImage);
imageRouter.post('/', authenticateUser, uploadImage);
imageRouter.put('/:id', authenticateUser, updateImage);
imageRouter.delete('/:id', authenticateUser, deleteImage);

module.exports = imageRouter;