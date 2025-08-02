const postModel = require('../models/post.model');

const generateCaption = require('../services/ai.service');

async function createPostController(req, res) {
    const file = req.file;
    console.log("recived file", file);

    const base64ImageFile = new Buffer.from(file.buffer).toString('base64');

    
    // console.log("base64ImageFile", base64ImageFile);

    const caption = await generateCaption(base64ImageFile);


    console.log("caption", caption);
    
    res.json({
        caption
    })
}

module.exports = {
    createPostController
}