import { userContext } from "../../../contexts/UserContext"
import style from "./LeftBarCom.module.css"

const LeftBarCom = () => {

  const {
    friendList,
    currentChatUser,
    setCurrentChatUser,
  } = userContext();


  return (
    <>
      <div className={style["top-section"]}>
        <h3>Friends</h3>
      </div>
      <div className={style["friend-list"]}>
        {friendList.map((friend) => (
          <div
            key={friend._id}
            className={`
              ${style["friend-item"]}
              ${ friend._id === currentChatUser?._id ? style["active"] : ""}
            `}
            onClick={() => setCurrentChatUser(friend)}
          >
            <div className={style["avatar"]}></div>
            <span>{friend.username}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default LeftBarCom