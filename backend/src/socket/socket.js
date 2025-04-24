import Message from "../models/Messages.js"
import { Server } from "socket.io"
import getBotReply from "../utils/getBotReply.js";

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors : {
            origin : "http://localhost:5173",
            credentials : true
        }
    });

    io.on("connection", (socket) => {
        // console.log("User connected", socket.id);

        socket.on("join", (userId) => {
            socket.join(userId);
        });

        //handle incoming messages
        socket.on("sendMessage", async (data) => {
            if (!data.sender || !data.receiver) {
                return;
            }
            // console.log("message received", data);
            try {
                const userQuestion = data.message;
                if (data.receiver === "chatBot"){
                    const botMsg = {
                        sender: "chatBot",
                        receiver: data.sender,
                        message: await getBotReply(userQuestion),
                    }
                    // console.log(botMsg);
                    io.to(data.sender).emit("receiveMessage", botMsg);
                    return;
                }
                //save message to database
                const newMessage = new Message({
                    sender : data.sender,
                    receiver : data.receiver,
                    message : data.message,
                });
                await newMessage.save() 

                io.to(data.receiver).emit("receiveMessage", newMessage);
            } catch (error) {
                //debugging purpose
                console.log("some error in socket.js file", error);
            }
        })

        //handle user disconnect
        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
        });
    })
    return io;
}

export default initializeSocket;