import { createContext, useContext, useEffect, useState } from "react";
import { socket, setupSocket } from "../socket/socket";
import { getMessage } from "../api/messageApi";
import showFriendList from "../api/showFriends";
import useAuthStore from "../store/useAuthStore";
import sendMessageToBot from "../api/chatBot.js";
const UserContext = createContext();

export const userContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [botMessages, setBotMessages] = useState([]);
    const [currentChatUser, setCurrentChatUser] = useState(null);
    const [friendList, setFriendList] = useState([]);
    const { userId } = useAuthStore();


    const fetchFriends = async () => {
        try {
            const bot = {
                _id: "chatBot",
                username: "SphereBot",
                isBot: true,
            }
            const response = await showFriendList();
            setFriendList([bot, ...response.data.message]);
        } catch (error) {
            console.log("Failed to fetch friends:", error);
        }
    };

    // get all the messages from a friendId
    const fetchMsg = async (friendId) => {
        try {
            if (friendId === "chatBot") {
                setMessages(botMessages);
                // console.log(messages);
            } else {
                const response = await getMessage(friendId);
                // console.log("response for message", response);
                setMessages(response.data.messages || []);
            }
        } catch (error) {
            console.log("error in fetching message", error);
        }
    }

    // send messages
    const sendMessage = (text) => {
        const receiverId = currentChatUser._id || currentChatUser.id;
        if (!receiverId || !userId || !text.trim()) {
            console.log("Missing data:", { currentChatUser, userId, text });
            return;
        }
       
        const msg = {
            sender: userId,
            receiver: receiverId,
            message: text.trim(),
        };
        // Emit to server
        socket.emit("sendMessage", msg);
        // Update UI
        setMessages((prev) => [...prev, msg]);
    }

    useEffect(() => {
        if (!userId) return;

        if (!socket.connected) {
            socket.connect();
            socket.on("connect", () => {
                setupSocket();
            });
        }

        const handleReceiveMessage = (newMsg) => {
            // Always push message (let frontend filter what to display)
            setMessages((prev) => [...prev, newMsg]);
        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, [userId]);


    return (
        <UserContext.Provider
            value={{
                messages,
                sendMessage,
                setMessages,
                setCurrentChatUser,
                fetchMsg,
                fetchFriends,
                currentChatUser,
                friendList,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}