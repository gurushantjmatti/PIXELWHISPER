const postModel = require('../models/post.model');

const generateCaption = require('../services/ai.service');

const {v4: uuidv4} = require('uuid');

const uploadFile = require('../services/storage.service');
const { Buffer } = require('buffer');


async function createPostController(req, res) {
    const file = req.file;
    console.log("recived file", file);

    const base64ImageFile = new Buffer.from(file.buffer).toString('base64');

    
    // console.log("base64ImageFile", base64ImageFile);

    const caption = await generateCaption(base64ImageFile);


    console.log("caption", caption);

    const result = await uploadFile(file.buffer, `${uuidv4()}`);

    const post = await postModel.create({
        caption,
        image: result.url,
        user: req.user._id
    })


    res.status(201).json({
        message: 'Post created successfully',
        post
    });


    res.json({
        caption,
        result,

    })
}

module.exports = {
    createPostController
}