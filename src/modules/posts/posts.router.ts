import { Router } from "express";
import { postsController } from "./posts.controller.ts";

//* Router
const router = Router();

// POST /
router.post("/", postsController.createPost);

export { router as postsRouter };
