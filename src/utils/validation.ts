import { z } from "zod";

export const validateRegisterForm = (data: any) => {
  const registerData = z.object({
    email: z.string().min(1, "Email cannot be empty"),
    password: z.string().min(1, "Password cannot be empty"),
    name: z.string().min(1, "Name cannot be empty"),
  });
  const response = registerData.safeParse(data);
  if (!response.success)
    throw new Error("validate fail please check input field again");
};

export const validateLoginForm = (data: any) => {
  const loginData = z.object({
    email: z.string().min(1, "Email cannot be empty"),
    password: z.string().min(1, "Password cannot be empty"),
  });
  const response = loginData.safeParse(data);
  if (!response.success)
    throw new Error("validate fail please check input field again");
};

export const validateBlogForm = (data: any) => {
  const blogForm = z.object({
    title: z.string().min(1, "Title cannot be empty"),
    content: z.string().min(1, "Content cannot be empty"),
    tags: z.string().array().nonempty("tags must contain at least 1 tag"),
  });
  blogForm.parse(data);
};
