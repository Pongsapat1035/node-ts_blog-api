import { z } from "zod";
import type { BlogData, RegisterData, LoginData } from "../types/type";


export const validateRegisterForm = (data: RegisterData) => {
  const registerData = z.object({
    email: z.string().min(1, "Email cannot be empty"),
    password: z.string().min(1, "Password cannot be empty"),
    name: z.string().min(1, "Name cannot be empty"),
  });
  const response = registerData.safeParse(data);
  if (!response.success)
    throw new Error("validate fail please check input field again");
};

export const validateLoginForm = (data: LoginData) => {
  const loginData = z.object({
    email: z.string().min(1, "Email cannot be empty"),
    password: z.string().min(1, "Password cannot be empty"),
  });
  const response = loginData.safeParse(data);
  if (!response.success)
    throw new Error("validate fail please check input field again");
};

type BlogForm = Pick<BlogData, "title" | "content" | "tags">;

export const validateBlogForm = (data: BlogForm) => {
  const blogForm = z.object({
    title: z.string().min(1, "Title cannot be empty"),
    content: z.string().min(1, "Content cannot be empty"),
    tags: z.string().array().nonempty("tags must contain at least 1 tag"),
  });
  const response = blogForm.safeParse(data);
  if (!response.success)
    throw new Error("validate fail please check input field again");
};
