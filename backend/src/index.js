import dotenv from "dotenv"
dotenv.config({
    path : "../.env"
});

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "../src/routes/indexRoutes.js"
import { connectDB } from "./database/db.js"
import http from "http"
import initializeSocket from "./socket/socket.js";

//intialize express app
const app = express();
//create HTTP server for socket websockets
const server = http.createServer(app);

//middlewares
app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}));
app.use(cookieParser())

//connect to database
connectDB();

//initialize socket.io
initializeSocket(server); //call this function to start websocket

//use routes
app.use("/api", router);


// start server
const PORT = 5002
server.listen(PORT, async() => {
    console.log(`running at port http://localhost:${PORT}` );
})





// //socket.io logic
// io.on("connection", (socket) => {
//     console.log("a User connected", socket.id);

//     //listening for message from clients
//     socket.on("sendMessage", (data) => {
//         console.log("message received", data);

//         //emit the message to the receiver
//         io.emit("receiveMessage", data);
//     });

//     //handle user disconnect
//     socket.on("disconnect", () => {
//         console.log("User disconnected", socket.id);
//     });
// });


