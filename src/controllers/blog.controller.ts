import db from "../utils/db.config";
import { Request, Response } from "express";

export const getBlogsHandler = async (req: Request, res: Response) => {
  try {
    const response = await db.query("SELECT * FROM blogs");
    const blogLists = response.rows;
    res.json(blogLists);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

export const getBlogHandler = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const response = await db.query("SELECT * FROM blogs WHERE id=$1", [
      blogId,
    ]);
    const blog = response.rows[0];
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

export const createBlogHandler = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    const authorId = req.user.userId;
    const createAt = new Date();
    const updateAt = new Date();

    await db.query(
      "INSERT INTO blogs(title, content, tags, author_id, createAt, updateAt) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, content, tags, authorId, createAt, updateAt]
    );

    res.status(200).json({ message: "Create blog success" });
  } catch (error) {
    console.log(error);
  }
};

export const updateBlogHandler = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const authorId = req.user.userId;
    const updateData = req.body;
    updateData.updateAt = new Date();

    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    values.push(blogId, authorId);
    const sql = `UPDATE blogs SET ${setClause} WHERE id = $${
      fields.length + 1
    } AND author_id = $${fields.length + 2}`;

    const response = await db.query(sql, values);

    res.status(200).json({ message: "update success", response });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlogHandler = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const authorId = req.user.userId;

    await db.query("DELETE FROM blogs WHERE id = $1 AND author_id = $2", [
      blogId,
      authorId,
    ]);

    res.status(200).json({ message: "delete blogs success" });
  } catch (error) {
    console.log("delete error : ", error);
    res.status(400).json(error);
  }
};
