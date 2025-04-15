import style from "./FriendReqsCom.module.css"
import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import showFriendReq from "../../api/showFriendReq";
import acceptFriendReq from "../../api/acceptFriendReq"

const FriendReqsCom = () => {
    const [showRequests, setShowRequests] = useState(false);
    const [friendRequests, setFriendRequests] = useState([]);
    const [acceptedIds, setAcceptedIds] = useState([]);

    const toggleRequests = () => {
        setShowRequests(prev => !prev);
    };
    const addFriendReq = async (requestID) => {
        try {
            const res = await acceptFriendReq(requestID);
            console.log(res.data.message);
            setAcceptedIds(prev => [...prev, requestID]);
        } catch (error) {
            console.log("Error in adding friend in firend req com", error);
        }
    }
    useEffect(() => {
        const fetchFriendReq = async () => {
            try {
                const res = await showFriendReq();
                setFriendRequests(res.data.message)
            } catch (error) {
                console.log("error at friend req Com", error);
            }
        }
        fetchFriendReq();
    }, [acceptedIds])
    return (
        <>
            <li>
                <button className={style["link-btn"]} onClick={toggleRequests}>
                    <span className={style["icon"]}>
                        <FaUserFriends size={25} />
                    </span>
                    <span className={style["text"]}>Requests</span>
                </button>
                {showRequests && (
                    <div className={style["request-box"]}>
                        {friendRequests.length > 0 ? (
                            friendRequests.map(req => (
                                <div key={req.sender._id} className={style["request-item"]}>
                                    <p>{req.sender.username}</p>
                                    {acceptedIds.includes(req._id) ? (
                                        <TiTick size={23} className={style["font-asm"]} />
                                    ) : (
                                        <IoIosAddCircle
                                            size={23}
                                            className={style["font-asm"]}
                                            onClick={() => addFriendReq(req._id)}
                                        />
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className={style["empty-text"]}>No requests</p>
                        )}
                    </div>
                )}
            </li>
        </>
    )
}

export default FriendReqsCom