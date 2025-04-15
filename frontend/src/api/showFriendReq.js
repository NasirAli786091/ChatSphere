import axiosInstance from "./axiosInstance"

const showFriendReq = () => {
    return axiosInstance.get("/requests");
}

export default showFriendReq;