import { Router } from "express";
import * as UserController from "../controllers/UserController";

const router = Router();

// router.get("/me", UserController.findAuthUser);
router.get("/", UserController.findAllUsers);
router.get("/:userId", UserController.findUser);
router.post("/create", UserController.createUser);
router.patch("/update/:userId", UserController.updateUser);
// router.patch("/update-password", UserController.updateUserPassword);
router.delete("/delete/:userId", UserController.deleteUser);

export default router;
