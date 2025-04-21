import { z } from "zod";

export const validateRegisterForm = (data: any) => {
  const registerData = z.object({
    email: z.string().min(1, "Email cannot be empty"),
    password: z.string().min(1, "Password cannot be empty"),
    name: z.string().min(1, "Name cannot be empty"),
  });
  const response = registerData.safeParse(data);
  if(!response.success) throw new Error("validate fail please check input field again")
};

export const validateLoginForm = (data: any) => {
  const loginData = z.object({
    email: z.string().min(1, "Email cannot be empty"),
    password: z.string().min(1, "Password cannot be empty"),
  });
  const response = loginData.safeParse(data);
  if(!response.success) throw new Error("validate fail please check input field again")
};
