import axiosInstance from "./axiosInstance";

export const getMessage = (friendId) => {
    return axiosInstance.get(`/getMessage/${friendId}`);
}

export const sendMessage = (to, text) => {
    return axiosInstance.post("/sendMessage",
    {
        to, text
    });
}