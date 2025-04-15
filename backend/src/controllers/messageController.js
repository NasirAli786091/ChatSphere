import User from "../models/UserModel.js";
import Messages from "../models/Messages.js";

export const getMessageController = async (req, res) => {
    try {
        // console.log("fecting message working??");
        const { friendId } = req.params;
        // console.log("friend id",friendId);
        const userId = req.user.id;
        // console.log("user id",userId);
        // console.log(userId);
        const messages = await Messages.find({
            $or : [
                {sender: userId, receiver: friendId},
                {sender: friendId, receiver: userId}
            ]
        }).sort({timestamp: 1});
        return res.status(200).json({messages});
    } catch (error) {
        console.log("error at get msg controller", error);
        return res.status(500).json({message: "failed to fetch message"});
    }
}

export const sendMessageController = async (req, res) => {
    try {
        // console.log("send message api working!");
        const {to, text} = req.body;
        const from = req.user.id;
        if(!to || !text) {
            console.log("no text or sender id");
            return res.status(400).json({error: "error heree"});
        }
        const receiver = await User.findById(to);
        if(!receiver) {
            return res.status(404).json({message: "receiver not found"});
        }
        //create new message
        const newMessage = new Messages({
            sender: from,
            receiver: to,
            message: text
        });

        const savedMessage = await newMessage.save();
        return res.status(201).json({message: savedMessage});
    } catch (error) {
        console.log("error at send msg controller", error);
        return res.status(500).json({ message: "Failed to send message" });
    }
}