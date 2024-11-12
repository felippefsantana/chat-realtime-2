import { Router } from "express";
import * as MessageController from "../controllers/MessageController";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/:chatId", auth, MessageController.findMessages);
router.post("/create", auth, MessageController.createMessage);

export default router;
