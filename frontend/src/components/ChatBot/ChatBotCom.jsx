import { LuBot } from "react-icons/lu";
import style from "./ChatBot.module.css"

const ChatBotCom = () => {
    return (
        <>
            <li>
                <button className={style["link-btn"]}>
                    <span className={style["icon"]}>
                        <LuBot size={24} />
                    </span>
                    <span className={style["text"]}>ChatBot</span>
                </button>
            </li>
        </>
    )
}

export default ChatBotCom