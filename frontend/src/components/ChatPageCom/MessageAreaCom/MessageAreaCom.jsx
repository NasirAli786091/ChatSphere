import style from "./MessageAreaCom.module.css"
import { useEffect, useRef } from "react"
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
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null); //message container
  const isUserAtBottomRef = useRef(true);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    const isAtBottom = scrollHeight - scrollTop === clientHeight;
    isUserAtBottomRef.current = isAtBottom;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (isUserAtBottomRef.current) {
      setTimeout(() => scrollToBottom(), 50);
    }
  }, [messages]);

  useEffect(() => {
    if (currentChatUser) {
      fetchMsg(currentChatUser._id).then(() => {
        setTimeout(() => scrollToBottom(), 100); // delay to ensure DOM is ready
      });
    }
  }, [currentChatUser]);

  return (
    <>
      {currentChatUser ? (
        <>
          <div className={style["top-section"]}>
            <div className={style["avatar"]}></div>
            <h4>{currentChatUser?.username}</h4>
          </div>

          <div className={style["mid-section"]} ref={containerRef}>
            {messages
              .filter(
                (msg) =>
                  msg.sender === currentChatUser?._id ||
                  msg.receiver === currentChatUser?._id
              )
              .map((msg) => (
                <div
                  key={msg._id}
                  className={`
                            ${style["message"]}
                            ${msg.sender === userId
                      ? style["me"]
                      : msg.sender === "chatBot"
                        ? style["bot"]
                        : style["friend"]
                    }
                  `}
                  >
                  {msg.message}
                </div>
              ))}

            <div ref={messagesEndRef} />
          </div>

          <div className={style["bottom-section"]}>
            <MessageInputCom />
          </div>
        </>
      ) : (
        <div
          className={style["blank-space"]}
          style={{ color: "white" }}>
          <div className={style["animated-text"]}>
            Select a friend to Chat
          </div>
        </div>
      )}
    </>
  )
}
