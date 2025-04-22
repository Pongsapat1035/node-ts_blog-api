import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/jwt";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken: string = req.headers.authorization?.split(" ")[1] || "";
    if (authToken === "") throw new Error("User not login");

    const decoded = validateToken(authToken);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Unauthorized: User not logged in" });
}
};
