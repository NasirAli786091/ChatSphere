import FriendReq from "../models/FriendRequestModel.js"
import User from "../models/UserModel.js"


//send friend request
export const sendFriendReqController = async (req, res) => {
    try {
        const { receiverId } = req.params;
        const senderId = req.user.id;

        //check if a request is already exist
        const existingReq = await FriendReq.findOne({
            sender : senderId,
            receiver : receiverId
        });
        if(existingReq) return res.status(400).json({message : "Friend request already sent"});

        //create new request
        const newReq = await FriendReq.create({
            sender : senderId,
            receiver : receiverId
        });
        return res.status(200).json({message : "friend request sent!", request : newReq});

    } catch (error) {
        //debugging purpose
        console.log("error in send friend request controller", error);
        return res.status(500).json({message : "error sending friend request"});
    }
}

//accept friend request
export const acceptFriendReqController = async (req, res) => {
    try {
        const { requestId } = req.params;

        const request = await FriendReq.findById(requestId);
        if(!request || request.status !== "pending"){
            return res.status(400).json({message : "Invalid friend Request"});
        }
        //update friend requst
        request.status = "accepted";
        await request.save();

        //add friend to both users list
        await User.findByIdAndUpdate(request.sender, {$addToSet : {friends : request.receiver}});
        await User.findByIdAndUpdate(request.receiver, {$addToSet : {friends : request.sender}});

        res.status(200).json({message : "friend request accepted!"});
    } catch (error) {
        //debugging purpose
        console.log("error in accept friend request controller", error);
        res.status(500).json({ message: "Error accepting friend request."});
    }
}

//reject friend request
export const rejectFriendReqController = async (req, res) => {
    try {
        const { requestId } = req.params;

        const request = await FriendReq.findById(requestId);
        if(!request || request.status !== "pending"){
            return res.status(400).json({message : "Invalid Friend Request"});
        }

        //update status to rejected
        request.status = "rejected";
        await request.save();

        res.status(200).json({message : "Friend Request rejected"});
    } catch (error) {
        //debugging purpose
        console.log("error in reject friend request controller", error);
        res.status(500).json({ message: "Error rejecting friend request."});
    }
}

//get pending friend request
export const getPendingReqsController = async (req, res) => {
    try {
        const userId = req.user.id;
        const requests = await FriendReq.find({receiver : userId, status : "pending"})
                            .populate("sender", "username email");

        res.status(200).json({message : requests});
    } catch (error) {
        //debugging purpose
        console.log("error in send pending request controller", error);
        res.status(500).json({ message: "Error fetching requests."});
    }
}

//get friend List
export const getFriendList = async (req, res) => {
    try {
        // console.log("friend list is called");
        const user = await User.findById(req.user.id).populate("friends", "username email");
        // console.log("friend list", user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({message : user.friends});
    } catch (error) {
        //debugging purpose
        console.log("error in friend list controller", error);
        res.status(500).json({ message: "Error fetching friends."});
    }
}