import { useEffect, useState } from "react"
import { userContext } from "../../../contexts/UserContext";
// import { sendMessage } from "../../../api/messageApi"
// import socket from "../../../socket/socket.js"

const MessageInputCom = () => {
  const [text, setText] = useState("");
  const {
    sendMessage,
  } = userContext();
  
  const handleSendMsg = () => {
    if(!text.trim()) return;
    sendMessage(text);
    setText("");
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMsg();
    }
  };
  // console.log("current chat user in Message input", currentChatUser);
  return (
    <>
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSendMsg}>Send</button>
    </>
  )
}
export default MessageInputCom