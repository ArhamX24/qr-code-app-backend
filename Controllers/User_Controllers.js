import UserModel from "../Model/User_Schema.js";

let registerUser = async (req,res) => {
    try {
        let {email, password} = req?.body;

        let userInDb = await UserModel.findOne({email:email})

        if(userInDb){
            return res.status(400).json({result: false, message: "User already exists."})
        }

        let userData = await UserModel.create({
            email: email,
            password: password
        });

        return res.status(200).json({result: true, message: "Registration Success", data: userData})

    } catch (error) {
        return res.status(400).send({result: false, message: error.message});
    }
}

let login = async (req,res) => {
    try {
        let {email, password} = req?.body;

        let userInDb = await UserModel.findOne({email: email})

        if(!userInDb){
            return res.status(400).json({result: false,message: "User Not Found."});
        }

        if(userInDb.password !== password){
            return res.status(400).json({result: false,message: "Password is incorrect"});
        }

        req.useremail = email;        

        return res.status(200).json({result: true, message: "Login Success", data: userInDb})

    } catch (error) {
        return res.status(400).send({result: false, message: error.message});
        
    }
}

export {registerUser, login}