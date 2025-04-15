import jwt from "jsonwebtoken"

const generateToken = (userID) =>{
    const token = jwt.sign({id: userID}, process.env.JWT_SECRET_KEY, {expiresIn : "1d"});
    return token;
}

export default generateToken;