import { createContext, useContext, useState } from "react";
import LoadingCom from "../components/LoadingPage/LoadingCom";

// Create the context
const LoadingContext = createContext();

// Provider to pass down loading state
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Return the provider with the necessary values
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, loadingAnimation: LoadingCom }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use loading context
export const useLoading = () => useContext(LoadingContext);