import LoginPageCom from "../components/LoginPage/LoginPageCom"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../api/auth"
import { useState } from "react"
import { useLoading } from "../contexts/LoadingContext"
import useAuthStore from "../store/useAuthStore"

const LoginPage = () => {
  const navigate = useNavigate();
  const [serverResponse, setServerResponse] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const { setIsLoading } = useLoading();
  const setUserId = useAuthStore((state) => state.setUserId);
  const setToken = useAuthStore((state) => state.setToken);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await loginUser(data);
      setServerResponse(res.data.message);
      setResponseStatus("success");

      setUserId(res.data.userId);
      setToken(res.data.token);
      
      setTimeout(() => {
        setIsLoading(false);
        navigate("/chat");
      }, 2000)
    } catch (error) {
      setResponseStatus("error");
      setServerResponse(error.response.data.message);
      setIsLoading(false);
      console.log("login page error", error.response.data.message);
    }
  }
  return (
    <>
      <LoginPageCom onSubmit={onSubmit} serverResponse={serverResponse} responseStatus={responseStatus}/>
    </>
  )
}

export default LoginPage