import User from "../models/UserModel.js";
import FriendReq from "../models/FriendRequestModel.js";
import mongoose from "mongoose";

const searchUsersController = async (req, res) => {
    try {
        const searchData = req.query.search;
        const currentUserId = req.user.id;

        if (!searchData) {
            return res.status(400).json({ message: "Search term is required" });
        }

        // Get current user data to access friends and sent requests
        const currentUser = await User.findById(currentUserId).select("friends");
        const sentRequests = await FriendReq.find({ sender: currentUserId }).select("receiver");

        // Extract user IDs to exclude
        const sentReqIds = sentRequests.map(req => req.receiver.toString());
        const friendIds = currentUser.friends.map(id => id.toString());

        // Prepare exclusion list
        const excludedUserIds = [currentUserId, ...sentReqIds, ...friendIds].map(id => new mongoose.Types.ObjectId(id));

        // Search users excluding the above list
        const users = await User.find({
            username: { $regex: searchData, $options: "i" },
            _id: { $nin: excludedUserIds }
        }).select("-password");

        const usernames = users.map((user) => ({
            id: user._id,
            username: user.username,
        }));

        return res.status(200).json({ message: usernames });
    } catch (error) {
        console.log("Error in search controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default searchUsersController;