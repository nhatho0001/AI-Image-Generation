import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../models/Post.js';

const router = express.Router()

router.get('/' , async(req , res , next)=>{
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
});

router.post('/' , async (req , res , next)=>{
    try {
        const {author , prompt , pathImg} = req.body;
        const newPost = await Post.create({
            name :author,
            prompt,
            photo: pathImg,
          });
        res.status(200).json({success : true , data : newPost})
    } catch (error) {
        res.status(403).send('Can not post form to database')
    }
})



export default router;