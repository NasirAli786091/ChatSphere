import { create } from "zustand";

const useAuthStore = create((set) => ({
    userId: localStorage.getItem('userId') || null,
    token: localStorage.getItem('token') || null,
  
    // Set User ID and Token
    setUserId: (userId) => {
      set(() => ({ userId }));
      localStorage.setItem('userId', userId); // Save to localStorage
    },
  
    setToken: (token) => {
      set(() => ({ token }));
      localStorage.setItem('token', token); // Save to localStorage
    },
  
    // Logout - Clear from both store and localStorage
    logout: () => {
      set(() => ({ userId: null, token: null }));
      localStorage.removeItem('userId'); // Remove from localStorage
      localStorage.removeItem('token'); // Remove from localStorage
    },
}))
// console.log("current user id from auth store", userId);

export default useAuthStore;