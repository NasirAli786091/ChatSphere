import style from "./RegisterCom.module.css"
import { FaUser, FaLock, FaEye, FaRegEyeSlash } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import registerSchema from "../../schema/registerSchema.js"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
const bgImg = "/Images/bg-image.webp"

const RegisterCom = ({ onSubmit, serverResponse, responseStatus }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
  })
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    console.log(errors);
  }, [errors])
  return (
    <div className={style["main-container"]}>
      <img src={bgImg} alt="" />

      <div className={style["register-container"]}>
        
        <h1>Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          {serverResponse && <p className={`${style["server-msg"]} ${style[responseStatus]}`}>{serverResponse}</p>}

          {/* username */}
          <div className={style["box"]}>
            <div className={style["input-box"]}>
              <span className={style["font-awesome"]}><FaUser /></span>
              <input
                type="text"
                placeholder=" "
                autoComplete="off"
                {...register("username")}
              />
              <span className={style["label"]}>Username</span>
            </div>
            {errors.username && <p className={style["err"]}>{errors.username.message}</p>}
          </div>

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
            {errors.email && <p className={style["err"]}>{errors.email.message}</p>}
          </div>

          {/* password */}
          <div className={style["box"]}>
            <div className={style["input-box"]}>
              <span className={style["font-awesome"]}><FaLock /></span>
              <input
                type={showPass ? "text" : "password"}
                placeholder=" "
                autoComplete="off"
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
            {errors.password && <p className={style["err"]}>{errors.password.message}</p>}
          </div>

          {/* confirm password */}
          <div className={style["box"]}>
            <div className={style["input-box"]}>
              <span className={style["font-awesome"]}><FaLock /></span>
              <input
                type="password"
                placeholder=" "
                autoComplete="off"
                {...register("confirmPassword")}
              />
              <span className={style["label"]}>Confirm Password</span>
              <span
                className={style["eyes"]}
                onClick={() => setShowConfirmPass(prev => !prev)}
              >
                {showConfirmPass ? <FaEye /> : <FaRegEyeSlash />}
              </span>
            </div>
            {errors.confirmPassword && <p className={style["err"]}>{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>

        <div className={style["bottom-box"]}>
          <p>Already have an account</p>
          <Link to={"/"}>Login</Link>
        </div>

      </div>
    </div>
  )
}
export default RegisterCom