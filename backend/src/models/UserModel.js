import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    avatar : {
        type : String, // url of profile picture
        default : "",
    },
    friends : [{
        //friends list
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }]
    },
    {timestamps : true}
);

const User = mongoose.model("User", userSchema);

export default User;