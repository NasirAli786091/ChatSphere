import Groq from "groq-sdk";
import dotenv from "dotenv";
import getBotReply from "../utils/getBotReply.js";
dotenv.config({
    path: "../.env",
})

const groq = new Groq({
    apiKey: process.env.GROK_SPHERE_BOT_KEY
});

const talkToBot = async (req, res) => {
    try {
        const { msg } = req.body;
        if(!msg){
            return res.status(400).json({error: "enter something..."});
        }
        return await res.status(400).json({message: getBotReply(msg)});
    } catch (error) {
        console.log("error in chatBotController", error);
        res.status(500).json({
            error: "Bot is taking a nap try again later."
        });
    }
}

export default talkToBot;