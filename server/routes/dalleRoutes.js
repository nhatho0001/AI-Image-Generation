import express from 'express';
import * as dotenv from 'dotenv';
//import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

router.post('/' , async (req , res)=>{
    async function query(data) {
        const response = await fetch(
            `https://pollinations.ai/p/${data}`,
            {
                method: "get",
            }
        );
        const result = response.url;
        return result;
    }
    try {
        const {prompt} = req.body
        const data = prompt.replaceAll(' ' , '_')
        console.log(data)
        const photo = await query(data)
        res.json({img : photo})
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
    
})


export default router;