import bcrypt from "bcrypt";
import * as jose from "jose";
import { prisma } from "../../prisma/prisma";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "unsupported http verb" });
  }
  const salt = bcrypt.genSaltSync();
  const { email, password, firstname, avatar } = req.body;
  if (!email || !password || !firstname) {
    res.status(400).json({ message: "invalid user input" });
  }
  let user: User;
  try {
    user = await prisma.user.create({
      data: {
        email: email,
        password: bcrypt.hashSync(password, salt),
        firstname,
        imageurl: avatar,
      },
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
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
  return res.json({
    id: user.id,
    firstname: user.firstname,
    email: user.email,
    createdAt: user.createdat,
  });
}
