import jwt from "jsonwebtoken";

export function generateMockToken(
  payload: object,
  expiresIn: string = "2h"
): string {
  const SECRET = process.env.SECRET;
  if (!SECRET) {
    throw new Error("SECRET tidak ada di ENV");
  }
  return jwt.sign(payload, SECRET, { expiresIn });
}