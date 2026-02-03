const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

const { createPostController, getAllPostsController } = require('../controllers/post.controller');
const multer = require('multer');


const upload = multer({ storage: multer.memoryStorage() });
//post only image file will come here
router.post('/',
    authMiddleware,//req.user
    upload.single('image'), // multer middleware to handle file upload
    createPostController)

router.get('/', authMiddleware, getAllPostsController);

module.exports = router;