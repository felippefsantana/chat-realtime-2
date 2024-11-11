import { Router } from "express";
import * as MessageController from "../controllers/MessageController";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/create", auth, MessageController.createMessage);

export default router;
