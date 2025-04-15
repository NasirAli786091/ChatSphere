import User from "../models/UserModel.js"
import { securePassword, matchPassword } from "../utils/passwordAuthentication.js"
import { registerValidator, loginValidator } from "../utils/authValidator.js"
import generateToken from "../utils/generateToken.js"

export const registerController = async(req, res) => {
    try {
        //validate the register inputs
        const parseData = registerValidator.parse(req.body);
        //use the validated users data
        const {username, email, password} = parseData;
        //find the user in database
        const user = await User.findOne({email});
        //look if email is already registered or not
        if(user){
            return res.status(401).json({message : "already registered"});
        }
        //else create a new user
        await User.create({
            username,
            email,
            password : await securePassword(password),
        })
        //return response to the frontend
        return res.status(201).json({message : "registered successful"});
    } catch (error) {
        //debug purpose
        console.log("some error in register controller");
        return res.status(500).json({message : "registration failed", error : error.issues[0].message})
    }
}
export const loginController = async (req, res) => {
    try {
        // validate the login inputs
        const parsedData = loginValidator.parse(req.body);
        // use the validated users data
        const {email, password} = parsedData;
        //look if its in database
        const curUser = await User.findOne({email});
        if(!curUser){ //if not in database
            return res.status(401).json({message : "Invalid credentials"});
        }
        //check if password mathes
        const matchedPass = await matchPassword(password, curUser.password);
        if(!matchedPass){//if not matched password
            return res.status(401).json({message : "Invalid credentials"});
        }
        // generate a token after verifications
        const token = generateToken(curUser._id);
        res.cookie("token", token, {
            httpOnly : true,
            secure : true,
            sameSite : "strict"
        })
        return res.status(200).json({
            message: "login successfull",
            token,
            userId: curUser._id,
        })
    } catch (error) {
        //debugging
        console.log("some error in login controller", error);
        return res.status(500).json({message : "registration failed", error : error.issues[0].message})
    }
}
export const logoutController = (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly : true,
            expires: new Date(0),
        });
        res.status(200).json({message : "Logout Successfull"})
    } catch (error) {
        //debugging purpose
        console.log("some error in logout controller", error);
        res.status(500).json({message : "Logout Failed", error : error.message});
    }
}