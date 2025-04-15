import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom"
import { Suspense, lazy } from "react"
import LoginPage from "./pages/LoginPage"
import { LoadingProvider, useLoading } from "./contexts/LoadingContext"
import useAuthStore from "./store/useAuthStore"
import LoadingCom from "./components/LoadingPage/LoadingCom"
import { UserProvider } from "./contexts/UserContext.jsx"

//lazy load these
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));


const AppContent = () => {
  const { isLoading } = useLoading();
  const { userId } = useAuthStore();
  // console.log("user id in app.jsx", userId);
  try {
    return (
      <>
        {isLoading && <LoadingCom/>}
          <Suspense fallback={<LoadingCom />} >
            <Routes>
              <Route path="/" element={userId ? <Navigate to="/chat" /> : <LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/chat"
                element={
                  userId ?
                    (<UserProvider>
                      <ChatPage />
                    </UserProvider>)
                    :
                    <Navigate to="/" />
                }
              />
            </Routes>
          </Suspense>
      </>
    );
  } catch (error) {
    console.log(error);
  }

}

const App = () => {
  return (
    <Router>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </Router>
  );
};
export default App