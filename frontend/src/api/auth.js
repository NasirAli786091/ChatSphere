import axiosInstance from "./axiosInstance"

export const loginUser = (credentials) => {
    return axiosInstance.post("/login", credentials);
}
export const registerUser = (userData) => {
    return axiosInstance.post("/register", userData);
}
export const logoutUser = () => {
    return axiosInstance.post("/logout");
}