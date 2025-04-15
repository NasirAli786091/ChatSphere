import User from "../models/UserModel.js"

const profileController = async (req, res) => {
    try {
        //get data from token
        const tokenData = req.user;
        const userData = await User.findById(tokenData.id).select("-password");
        
        //if user is not in database
        if(!userData) return res.status(404).json({message : "user not found"});

        // else return user datas
        return res.status(200).json({message : userData});
        
    } catch (error) {
        console.log("error in profile controller", error);
        res.status(500).json({message : "server error"});
    }
}

export default profileController;