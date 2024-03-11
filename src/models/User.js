import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    avatarUrl:String,
    socialOnly:{type:Boolean,default:false}, //소셜id로 로그인한 유저인지 확인하기 위해
    username:{type:String,required:true,unique:true},
    password:{type:String,required:false},
    name:{type:String,required:true},
    location:String,
})

userSchema.pre('save',async function(){
    console.log("Users password:",this.password);
    this.password=await bcrypt.hash(this.password, 5);
    console.log("Hased Password:",this.password);
});

const User=mongoose.model("User",userSchema);
export default User;