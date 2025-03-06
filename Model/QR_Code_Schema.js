import mongoose from "mongoose";

let {Schema, model} = mongoose;

let QrSchema = new Schema({
    qrCode: {type: String, required: true},
    qrCodeImage: {type: String, required: true},
    isScanned: {type: Boolean, default: false}
})

let QrModel = model('QrCodes', QrSchema);

export default QrModel;