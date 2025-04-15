import style from "./NavbarCom.module.css"
import { FaMessage } from "react-icons/fa6";
// import { FaUserAlt } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { IoSettings, IoLogOut } from "react-icons/io5";
import { useLoading } from "../../contexts/LoadingContext";
import { logoutUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import SearchCom from "../SearchCom/SearchCom";
import FriendReqsCom from "../FriendReqsCom/FriendReqsCom";
import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";

const NavbarCom = () => {
    const navigate = useNavigate();
    const { setIsLoading } = useLoading();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            const res = await logoutUser();
            logout();
            setTimeout(() => {
                setIsLoading(false);
                navigate("/");
            }, 2000)
        } catch (error) {
            setIsLoading(false);
            console.log("some error handling logout", error);
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className={style["navbar-container"]}>

            <div className={style["title-box"]}>
                <h1><span>C</span>hat<span>S</span>phere</h1>
            </div>

            {/* search friend */}
            <SearchCom />

            {/* hamburger menu button when scrren size is small */}
            <div className={style["menu-btn"]} onClick={toggleMenu}>
                <CiMenuFries size={24} color="white" />
            </div>
            <div className={`${style["nav-items"]} ${isMenuOpen ? style["open"] : ""}`}>
                <ul>

                    {/* friend req */}
                    <FriendReqsCom />

                    {/* chat */}
                    <li>
                        <button className={style["link-btn"]}>
                            <span className={style["icon"]}>
                                <FaMessage size={20} />
                            </span>
                            <span className={style["text"]}>Chat</span>
                        </button>
                    </li>

                    {/* profile */}
                    {/* <li>
                        <button className={style["link-btn"]}>
                            <span className={style["icon"]}>
                                <FaUserAlt size={20} />
                            </span>
                            <span className={style["text"]}>Profile</span>
                        </button>
                    </li> */}

                    {/* setting */}
                    <li>
                        <button className={style["link-btn"]}>
                            <span className={style["icon"]}>
                                <IoSettings size={24} />
                            </span>
                            <span className={style["text"]}>Setting</span>
                        </button>
                    </li>

                    {/* Logout */}
                    <li onClick={handleLogout}>
                        <button className={style["link-btn"]}>
                            <span className={style["icon"]}>
                                <IoLogOut size={28} />
                            </span>
                            <span className={style["text"]}>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavbarCom