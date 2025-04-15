import Message from "../models/Messages.js"
import { Server } from "socket.io"

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors : {
            origin : "http://localhost:5173",
            credentials : true
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected", socket.id);

        socket.on("join", (userId) => {
            socket.join(userId);
            console.log(`user with id ${userId} joined room`);
        });

        //handle incoming messages
        socket.on("sendMessage", async (data) => {
            if (!data.sender || !data.receiver) {
                console.log("Invalid message payload received:", msg);
                return;
            }
            // console.log("message received", data);
            try {
                //save message to database
                const newMessage = new Message({
                    sender : data.sender,
                    receiver : data.receiver,
                    message : data.message,
                });
                await newMessage.save() 

                io.to(data.receiverId).emit("receiveMessage", newMessage);
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