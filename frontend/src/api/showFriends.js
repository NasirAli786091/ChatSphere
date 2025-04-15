import axiosInstance from "./axiosInstance";

const showFriendList = async () => {
    return await axiosInstance.get("/friendList");
}

export default showFriendList;