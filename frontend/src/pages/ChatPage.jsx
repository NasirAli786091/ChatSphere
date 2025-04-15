import { useEffect } from "react"
import MainChatPageCom from "../components/ChatPageCom/MainChatPage/MainChatPageCom.jsx"
import NavbarCom from "../components/NavbarComponent/NavbarCom.jsx"
import { userContext } from "../contexts/UserContext.jsx"


const ChatPage = () => {
  const { fetchFriends } = userContext();
  useEffect(() => {
    fetchFriends();
  }, [])
  return (
    <div className="main-container">
      <NavbarCom />
      <MainChatPageCom />
    </div>
  )
}

export default ChatPage