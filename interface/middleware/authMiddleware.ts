import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access Denied" });
    return; 
  }

  try {
    const decoded = jwt.verify(token, "a3f1b29c8a62d3e4f7c9b6a8e1d5c3a7");
    (req as any).user = decoded; 
    next(); 
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
    return;
  }
};

export default verifyToken;