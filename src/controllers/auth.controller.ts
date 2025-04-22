import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../utils/password";
import { validateRegisterForm, validateLoginForm } from "../utils/validation";
import db from "../utils/db.config";
import { getJwt } from "../utils/jwt";
import { v4 as uuidv4 } from "uuid";

interface UserInfo {
  userId: string;
  email: string;
  name: string;
  password: string;
}

const checkUser = async (email: string): Promise<UserInfo | null> => {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (result.rows.length > 0) {
    const userInfo = result.rows[0] as UserInfo;
    userInfo.userId = result.rows[0].user_id;
    return userInfo;
  } else {
    return null;
  }
};

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    validateRegisterForm(data);

    const userId = uuidv4();
    const { email, name, password } = data;

    const userInfo: UserInfo | null = await checkUser(email);
    if (userInfo) throw new Error("Email is already exist");

    const hashedPassword = await hashPassword(password);
    const token = getJwt({ userId, name });
   
    await db.query(
      "INSERT INTO users(user_id, email, password, name) VALUES ($1, $2, $3, $4)",
      [userId, email, hashedPassword, name]
    );

    res.json({ message: "register success!", token });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json(error.message);
    } else {
      res.status(400).json("An unknown error occurred");
    }
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    validateLoginForm(data);

    const { email, password } = data;
    const userInfo: UserInfo | null = await checkUser(email);
    if (!userInfo) throw new Error("User not found");

    const checkPassword = await comparePassword(password, userInfo.password);
    if (!checkPassword) throw new Error("password does not match");

    const { userId, name } = userInfo;
    const token = getJwt({ userId, name });

    res.json({ message: "login success !", token });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json(error.message);
    } else {
      res.status(400).json("An unknown error occurred");
    }
  }
};

export const checkToken = (req: Request, res: Response) => {
  try {
    const authToken = req.headers.authorization;

    const convertToken = authToken?.split(" ")[1];
    console.log(convertToken);

    // const decode = validateToken()
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
