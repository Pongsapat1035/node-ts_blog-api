import express from "express";
import {
  createBlogHandler,
  getBlogsHandler,
  getBlogHandler,
  deleteBlogHandler,
  updateBlogHandler
} from "../controllers/blog.controller";
import { checkAuth } from "../middleware/middleware";

const router = express.Router();

router.get("/posts", getBlogsHandler);
router.get("/post/:blogId", getBlogHandler);

router.use(checkAuth);
router.post("/post", createBlogHandler);
router.patch("/post/:blogId", updateBlogHandler);
router.delete("/post/:blogId", deleteBlogHandler);

export default router;
