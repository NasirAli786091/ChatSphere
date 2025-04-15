import axiosInstance from "./axiosInstance"

const sendFriendReq = (id) => {
    return axiosInstance.post(`/request/${id}`);
}

export default sendFriendReq;