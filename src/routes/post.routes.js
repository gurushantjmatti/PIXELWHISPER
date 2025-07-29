const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');   

const multer = require('multer');


const upload = multer({storage: multer.memoryStorage()});
//post only image file will come here
router.post('/',
    authMiddleware,//req.user
    upload.single('image'), // multer middleware to handle file upload
    createPostController) 

module.exports = router;