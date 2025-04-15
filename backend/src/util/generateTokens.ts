import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

enum ExpiryOption {
  oneMinute = 60, // JWT expects seconds
  oneHour = 60 * 60,
  oneMonth = 60 * 60 * 24 * 30,
}

export function generateToken(data: object, expiresIn: ExpiryOption): string {
  console.log(process.env.SECRET, data);

  const token = jwt.sign(data, process.env.SECRET as string, { expiresIn });
  console.log({ token });
  return token;
}

export { ExpiryOption };
