import axiosInstance from "./axiosInstance";

const sendMessageToBot = (text) => {
    return axiosInstance.post("/chatBot",{
        msg: text,
    });
}

export default sendMessageToBot;