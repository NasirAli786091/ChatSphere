import { io } from "socket.io-client"
import useAuthStore from "../store/useAuthStore";

const socket = io(import.meta.env.VITE_BACKEND_BASE_URL, {
    withCredentials: true,
    autoConnect: false,
});


const setupSocket = async () => {
  const userId = useAuthStore.getState().userId;
    try {
      if (userId) {
        socket.emit("join", userId);
        // console.log("Joined socket room:", userId);
      } else {
        console.log("User ID not found while joining socket");
      }
    } catch (error) {
      console.log("Error getting current user for socket:", error);
    }
  };

socket.on("connect", () => {
    setupSocket();
});

export { socket, setupSocket };