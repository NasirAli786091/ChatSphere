import axiosInstance from "./axiosInstance";

const acceptFriendReq = (senderId) => {
    return axiosInstance.post(`/accept/${senderId}`);
}

export default acceptFriendReq;