import { useState } from "react";
import RegisterCom from "../components/RegisterPage/RegisterCom.jsx"
import { registerUser } from "../api/auth.js";
import { useLoading } from "../contexts/LoadingContext.jsx";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [serverResponse, setServerResponse] = useState("");
  const { setIsLoading } = useLoading();
  const [responseStatus, setResponseStatus] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await registerUser(data);
      const serverRes = response.data.message;
      console.log("response from server", serverRes);
      setServerResponse(serverRes);
      setResponseStatus("success");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/"); //login page
      }, 2000)
    } catch (error) {
      setServerResponse(error.response.data.message);
      setResponseStatus("error");
      setIsLoading(false);
      console.log("some error in register", serverResponse);
    }
  }
  return (
    <>
      <RegisterCom onSubmit={onSubmit} serverResponse={serverResponse} responseStatus={responseStatus} />
    </>
  )
}

export default RegisterPage