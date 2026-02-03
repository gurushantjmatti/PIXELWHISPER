const postModel = require('../models/post.model');

const generateCaption = require('../services/ai.service');

const { v4: uuidv4 } = require('uuid');

const uploadFile = require('../services/storage.service');
const { Buffer } = require('buffer');


async function createPostController(req, res) {
    try {
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

        console.log("Created post:", post);
        const responsePayload = {
            message: 'Post created successfully',
            post: post
        };
        console.log("Sending response:", JSON.stringify(responsePayload));

        res.status(201).json(responsePayload);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

async function getAllPostsController(req, res) {
    try {
        const posts = await postModel.find({ user: req.user._id });
        res.status(200).json({
            posts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

module.exports = {
    createPostController,
    getAllPostsController
}
console.log("POST CONTROLLER FILE LOADED - DEBUG");