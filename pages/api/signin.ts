import * as jose from "jose";
import bcrypt from "bcrypt";
import cookie from "cookie";
import { prisma } from "../../prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { isInt8Array } from "util/types";
import { PrismaClientInitializationError } from "@prisma/client/runtime";
const signin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "unsupported http verb" });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "invalid user input" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = await new jose.SignJWT(user)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt(Date.now())
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode(process.env.TOKENSECRET));
      res.setHeader(
        "Set-cookie",
        cookie.serialize("T_ACCESS_TOKEN", token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          sameSite: "lax",
          path: "/",
          secure: process.env.NODE_ENV === "production",
        })
      );
      res.json({
        id: user.id,
        email: user.email,
        createdAt: user.createdat,
      });
    } else {
      res.status(401).json({ error: "user or password is incorrect" });
    }
  } catch (error: Error | any) {
    return res.status(500).json({ error: error });
  }
};
export default signin;
