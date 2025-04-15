import jwt from "jsonwebtoken"

const checkAuth = (req, res, next) => {
    try {
        //get token from cookies
        const token = req.cookies.token;
        
        //if no token found or invalid token
        if(!token) return res.status(401).json({message : "Unauthorized"});
        
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        //attach requested data to req.user
        req.user = decoded;

        next(); //call the next middleware/route
    } catch (error) {
        console.log("some error at checkAuth middleware", error);
        return res.status(401).json({message : "Unauthorized or Invalid token"});
    }
}

export default checkAuth;