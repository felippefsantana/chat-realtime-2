import { Router } from "express";
import * as ChatController from "../controllers/ChatController";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/", auth, ChatController.findUserChats);
router.get("/:chatId", auth, ChatController.findChat);
router.post("/create", auth, ChatController.createChat);

export default router;
