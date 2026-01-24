import { Router } from "express";
import { commentsController } from "./comments.controller.ts";
import { auth, UserRole } from "../../middlewares/auth.ts";

//* Router
const router = Router();

// POST /
router.post("/", auth(UserRole.USER, UserRole.ADMIN), commentsController.createComment);

export { router as commentsRouter };
