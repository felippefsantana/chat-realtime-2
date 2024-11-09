import { Router } from "express";
import * as UserController from "../controllers/UserController";

const router = Router();

// router.get("/me", UserController.findAuthUser);
router.post("/create", UserController.createUser);
// router.patch("/update", UserController.updateUser);
// router.patch("/update-password", UserController.updateUserPassword);
// router.delete("/delete", UserController.deleteUser);

export default router;
