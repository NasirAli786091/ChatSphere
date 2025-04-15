import axiosInstance from "./axiosInstance"

export const searchUsers = (username) => {
    return axiosInstance.get("/search", {
        params: {
            search: username
        }
    });
};