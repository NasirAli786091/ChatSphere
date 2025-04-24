import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config({
    path: "../.env",
})

const groq = new Groq({
    apiKey: process.env.GROK_SPHERE_BOT_KEY
});

const getBotReply = async (msg) => {
    try {
        const response = await groq.chat.completions.create({
            messages: [{
                role: "user",
                content: msg
            }],
            model: "llama-3.3-70b-versatile",
        });

        const botReply = response.choices[0].message.content;
        return botReply;
    } catch (error) {
        console.log("error in get bot reply", error);
        return "Sorry, I'm having trouble replying right now.";
    }
}

export default getBotReply;