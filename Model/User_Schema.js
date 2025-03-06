import mongoose from "mongoose";

let {Schema, model} = mongoose

let UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true, min: [8, "password is too short"]},
    coupons: [{type: String, ref: "Coupon"}]
})


let UserModel = model("User", UserSchema)

export default UserModel