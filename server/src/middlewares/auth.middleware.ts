import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { blacklistedTokens } from "../controllers/auth.controller";
// const blacklistedTokens = new Set<string>();
const SECRET: string = process.env.SECRET || "";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }

  const [prefix, accessToken] = token.split(" ");
  if (prefix !== "Bearer" || !accessToken) {
    return res.status(401).json({
      message: "Unauthorized: Invalid token format",
    });
  }

  if (blacklistedTokens.has(accessToken)) {
    return res.status(401).json({
      message: "Unauthorized: Token has been blacklisted",
    });
  }
  try {
    const user = jwt.verify(accessToken, SECRET) as { id: number; sekolahId: number; role: string; namaSekolah: string };
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    // console.log(user)
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Sesi anda telah berakhir, silahkan login kembali",
      });
    }

    return res.status(401).json({
      message: "Unauthorized: Invalid token",
    });
  }
};
