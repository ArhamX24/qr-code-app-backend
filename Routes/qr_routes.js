import express from "express";
import { scanQr } from "../Controllers/Qr_Controllers.js";

let QrRouter = express.Router();


QrRouter.post("/scan-qr", scanQr)


export default QrRouter