import style from "./SearchCom.module.css"
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci"
import { IoIosAddCircle } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { searchUsers } from "../../api/searchUser";
import sendFriendReq from "../../api/sendFriendReq.js"

const SearchCom = () => {
    const [userQuery, setUserQuery] = useState("");
    const [queryResult, setQueryResult] = useState([]);
    const [isSent, setIsSent] = useState([]);
    const handleSearch = async () => {
        try {
            const { data } = await searchUsers(userQuery);
            setQueryResult(data.message);
        } catch (error) {
            console.log("error at search com", error);
        }
    }
    const handleAddFriend = async (receiverID) => {
        try {
            const response = await sendFriendReq(receiverID);
            console.log("response from friend req api", response.data.message);
            setIsSent(prev => [...prev, receiverID]);
        } catch (error) {
            console.log("error in search com", error.response.data.message);
        }
    }
    useEffect(() => {
        if (userQuery.trim() !== "") {
            handleSearch();
        } else {
            setQueryResult([]);
        }
    }, [userQuery]);

    return (
        <div className={style["search-container"]}>
            <div className={style["top-box"]}>
                <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                />
                <CiSearch size={20} className={style["font"]} onClick={handleSearch} />
            </div>
            <div className={style["searched-result"]}>
                {queryResult && queryResult.map((users) => {
                    return (
                        <div className={style["items"]}>
                            <h5>{users.username}</h5>
                            {/* update UI */}
                            {isSent.includes(users.id) ? (
                                <TiTick 
                                    size={23}
                                    className={style["font-asm"]}
                                />
                            ) : (
                                <IoIosAddCircle
                                    size={23}
                                    className={style["font-asm"]}
                                    onClick={() => handleAddFriend(users.id)}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchCom