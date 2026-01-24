import { Router } from "express";
import { postsController } from "./posts.controller.ts";
import { auth, UserRole } from "../../middlewares/auth.ts";

//* Router
const router = Router();

// POST /
router.post("/", auth(UserRole.USER, UserRole.ADMIN), postsController.createPost);
// GET /
router.get("/", postsController.getPosts);

export { router as postsRouter };
