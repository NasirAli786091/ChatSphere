import style from "./LoginPageCom.module.css"
import loginSchema from "../../schema/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { MdEmail } from "react-icons/md"
import { FaLock, FaEye, FaRegEyeSlash } from "react-icons/fa"
import { useState } from "react"
import { Link } from "react-router-dom"
const bgImg = "/Images/bg-image.webp"

const LoginPageCom = ({ onSubmit, serverResponse, responseStatus }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "all"
    })
    const [showPass, setShowPass] = useState(false);

    return (
        <div className={style["main-container"]}>
            <img src={bgImg} alt="" />

            <div className={style["login-container"]}>
                <h1>Login</h1>

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* server response */}
                    {serverResponse && <p className={`${style["server-msg"]} ${style[responseStatus]}`}>{serverResponse}</p>}

                    {/* email */}
                    <div className={style["box"]}>
                        <div className={style["input-box"]}>
                            <span className={style["font-awesome"]}><MdEmail /></span>
                            <input
                                type="email"
                                placeholder=" "
                                autoComplete="off"
                                {...register("email")}
                            />
                            <span className={style["label"]}>Email</span>
                        </div>
                        {errors.email && <p className={style["err"]}>{errors.email?.message}</p>}
                    </div>

                    {/* password */}
                    <div className={style["box"]}>
                        <div className={style["input-box"]}>
                            <span className={style["font-awesome"]}><FaLock /></span>
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder=" "
                                {...register("password")}
                            />
                            <span className={style["label"]}>Password</span>
                            <span
                                className={style["eyes"]}
                                onClick={() => setShowPass(prev => !prev)}
                            >
                                {showPass ? <FaEye /> : <FaRegEyeSlash />}
                            </span>
                        </div>
                        {errors.email && <p className={style["err"]}>{errors.password?.message}</p>}
                    </div>

                    <button type="submit">Login</button>
                </form>
                <div className={style["bottom-box"]}>
                    <p>Not have an Account</p>
                    {/* <a href="#">Register</a> */}
                    <Link to={"/register"}>Register</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPageCom