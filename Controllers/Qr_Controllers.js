import UserModel from "../Model/User_Schema.js";
import QrModel from "../Model/QR_Code_Schema.js";

let scanQr = async (req,res) => {
    try {

        let email = req?.headers.email;

        let userInDb = await UserModel.findOne({email: email});

        if(!email){
            return res.status(400).json({result:false, message: "Please Login To Continue"});
        }

        let {scannedCode} = req?.body;
        
        let couponAlreadyInUserDb = userInDb.coupons.find((item)=> item === scannedCode);

        const validateQrCode = await QrModel.findOne({qrCode: scannedCode});

        if(!validateQrCode){
            return res.status(400).json({result:false, message: "Invalid Qr Code"});
        }

        if(validateQrCode.isScanned == true || couponAlreadyInUserDb){
            return res.status(400).json({result:false, message: "Qr Code Is Already Scanned"})
        }        

        validateQrCode.isScanned = true;
        await validateQrCode.save()

        let user = await UserModel.updateOne({email: email}, {"$push": {coupons: scannedCode}});

        return res.status(200).json({result: true, message: "SuccessFully Scanned And Coupon Added", data: user});
        
    } catch (error) {
        return res.status(400).json({result: false, message: error.message});
    }
}

export {scanQr}