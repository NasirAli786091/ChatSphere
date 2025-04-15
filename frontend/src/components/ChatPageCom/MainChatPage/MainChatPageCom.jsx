import style from "./MainChatPageCom.module.css"
import { useRef } from "react"
import LeftBarCom from "../LeftBarCom/LeftBarCom"
import { MessageAreaCom } from "../MessageAreaCom/MessageAreaCom"
import WallCom from "../WallCom/WallCom.jsx"

const MainChatPageCom = () => {
  const leftBarRef = useRef(null);
  const messageAreaRef = useRef(null);

  return (
    <div className={style["main-container"]}>

      <div className={style["left-menu"]} ref={leftBarRef}>
        <LeftBarCom/>
      </div>

      <WallCom
        leftBarRef={leftBarRef}
        messageAreaRef={messageAreaRef}
      />

      <div className={style["right-container"]} ref={messageAreaRef}>
        <MessageAreaCom />
      </div>

    </div>
  )
}

export default MainChatPageCom