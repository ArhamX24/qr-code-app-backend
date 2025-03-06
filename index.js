import express, { urlencoded } from "express";
import { fileURLToPath } from "url"
import dbconnect from "./DB/dbconnect.js";
import UserRouter from "./Routes/user_routes.js";
import QrRouter from "./Routes/qr_routes.js";
import qrCode from "qrcode";
import QrModel from "./Model/QR_Code_Schema.js";
import fs from "fs"
import "dotenv/config"
import cors from "cors"
import path from "path";

let server = express();
let PORT = 8000;

server.use(express.json());
server.use(urlencoded({extended: true}));
server.use(cors({
    origin: "https://qrcodehsp.netlify.app",
    credentials: true
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

server.use("/user", UserRouter)
server.use("/qr", QrRouter)


let generateQrCode = async (count) => {
    for(let i=0; i<count; i++){

        const uniqueCode = `QR-${i}-${Date.now()}`;
        const qrFilePath = path.join(__dirname, "qrCodes", `${uniqueCode}-${i}.png`)

        await qrCode.toFile(qrFilePath, uniqueCode, {
            errorCorrectionLevel: 'H',
            width: 300,
            type: 'png'
        })

        const imageData = fs.readFileSync(qrFilePath, {encoding: "base64"});

        await QrModel.create({
            qrCode: uniqueCode,
            qrCodeImage: imageData,
            isScanned: false
        })

        console.log(`QR Code ${i + 1} generated and saved: ${uniqueCode}`);
    }
}

// generateQrCode(5);

dbconnect().then(()=>{
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    });
}).catch((err)=>{
    console.log(err);
})