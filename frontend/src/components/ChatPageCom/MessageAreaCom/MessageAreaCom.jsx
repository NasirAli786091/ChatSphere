import style from "./MessageAreaCom.module.css"
import { useEffect } from "react"
import MessageInputCom from "./MessageInputCom.jsx"
import { userContext } from "../../../contexts/UserContext"
import useAuthStore from "../../../store/useAuthStore"

export const MessageAreaCom = () => {
  const {
    messages,
    fetchMsg,
    currentChatUser,
  } = userContext();
  const { userId } = useAuthStore();

  useEffect(() => {
    if (currentChatUser) {
      fetchMsg(currentChatUser._id);
    }
  }, [currentChatUser, fetchMsg]);

  return (
    <>
      {currentChatUser ? (
        <>
          <div className={style["top-section"]}>
            <div className={style["avatar"]}></div>
            <h4>{currentChatUser?.username}</h4>
          </div>

          <div className={style["mid-section"]}>
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={
                  `
              ${style["message"]}
              ${msg.sender === userId ? style["me"] : style["friend"]}
            `
                }
              >
                {msg.message}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div 
        className={style["blank-space"]} 
        style={{ color: "white" }}>
          Select a friend to Chat
        </div>
      )}

      <div className={style["bottom-section"]}>
        {/* <MessageInputCom handleSendMsg={handleSendMsg} /> */}
        <MessageInputCom />
      </div>
    </>
  )
}
