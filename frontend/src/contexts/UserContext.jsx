import { createContext, useContext, useEffect, useState } from "react";
import { socket, setupSocket } from "../socket/socket";
import { getMessage } from "../api/messageApi";
import showFriendList from "../api/showFriends";
import useAuthStore from "../store/useAuthStore";

const UserContext = createContext();

export const userContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [currentChatUser, setCurrentChatUser] = useState(null);
    const [friendList, setFriendList] = useState([]);
    const { userId } = useAuthStore();
    
    // useEffect(() => {
        // fetchFriends();
    // }, []);
        const fetchFriends = async () => {
          try {
            const response = await showFriendList();
            setFriendList(response.data.message);
          } catch (error) {
            console.log("Failed to fetch friends:", error);
          }
        };
      

    // get all the messages from a friendId
    const fetchMsg = async (friendId) => {
        try {
            const response = await getMessage(friendId);
            // console.log("response for message", response);
            setMessages(response.data.messages || []);
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
        console.log("sending message", msg);
        // Emit to server
        socket.emit("sendMessage", msg);
        // Update UI
        setMessages((prev) => [...prev, msg]);
    }

    useEffect(() => {
        // console.log("user id in socket", userId);
        if(userId){
            socket.connect();
            socket.on("connect", () => {
                setupSocket();
            });
        };
        socket.on("receiveMessage", (newMsg) => {
            if (
                newMsg.sender === currentChatUser?._id ||
                newMsg.receiver === currentChatUser?._id
            ) {
                setMessages((prev) => [...prev, newMsg]);
            }
        });
        return () => {
            socket.off("receiveMessage")
        };
    }, [userId, currentChatUser]);

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