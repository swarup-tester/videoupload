const multer = require("multer");
const path = require("path");
const express = require('express');
const router = express.Router();

// Access the Model file
const PostVideo = require('../model/post');

// Video
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('./videos')) // path of the upload folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".mp4") {
            return cb(res.status(400).end("only mp4 is allowed"), false);
        }
        cb(null, true);
    },
});

// Add Post
router.post("/api/post", multer({ storage: storage }).single("video"),
    (req, res, next) => {
        const url = req.protocol + "://" + req.get("host");
        const post = new PostVideo({
            title: req.body.title,
            content: req.body.content,
            videoPath: url + "/videos/" + req.file.filename
        });

        post.save().then(createPost => {
            res.status(201).json({
                message: 'Post added successfully',
                post: {
                    id: createPost._id,
                    title: createPost.title,
                    content: createPost.content,
                    videoPath: createPost.videoPath
                }
            });
        });
    })

    // Get API
router.get("/api/post", (req, res, next) => {
    res.json({
        title: 'Hello Swarup'
    })
})

module.exports = router;