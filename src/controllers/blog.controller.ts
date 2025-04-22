import db from "../utils/db.config";
import { Request, Response } from "express";
import type { BlogData } from "../types/type";
import { validateBlogForm } from "../utils/validation";

export const getBlogsHandler = async (req: Request, res: Response) => {
  try {
    const sql = "SELECT * FROM blogs";
    const response = await db.query(sql);

    if (response.rowCount) {
      const blogLists = response.rows as BlogData[];
      res.json(blogLists);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

export const getBlogHandler = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const sql = "SELECT * FROM blogs WHERE id = $1";
    const response = await db.query(sql, [blogId]);

    if (response.rowCount) {
      const blog = response.rows[0] as BlogData;
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
    validateBlogForm({ title, content, tags });
    const createAt = new Date();
    const updateAt = new Date();
    const sql =
      "INSERT INTO blogs(title, content, tags, author_id, create_at, update_at) VALUES ($1, $2, $3, $4, $5, $6)";

    const response = await db.query(sql, [title, content, tags, authorId, createAt, updateAt]);
    if(response.rowCount !== 0) res.status(200).json({ message: "Create blog success" });

    res.status(400).json({ message: "Can't create blog" })
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
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
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");

    values.push(blogId, authorId);
    const sql = `UPDATE blogs SET ${setClause} WHERE id = $${fields.length + 1} AND author_id = $${fields.length + 2}`;
    const response = await db.query(sql, values);

    if(response.rowCount !==0) {
      res.status(200).json({ message: "update success", response });
    }
    res.status(400).json({ message: "can't update blogs" })
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export const deleteBlogHandler = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const authorId = req.user.userId;
    const sql = "DELETE FROM blogs WHERE id = $1 AND author_id = $2";
    const response = await db.query(sql, [blogId, authorId]);

    if (response.rowCount === 0) {
      res.status(404).json("Can't delete doc");
    }

    res.status(200).json({ message: "delete blogs success" });
  } catch (error) {
    console.log("delete error : ", error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};
