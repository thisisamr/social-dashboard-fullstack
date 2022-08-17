import bcrybt from "bcrypt";
import * as jose from "jose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { jwtUser, NextApiHandlerExtended } from "./types";
import { prisma } from "../prisma/prisma";
import { User } from "@prisma/client";

// there is a bug here we should return null or empty object as the unauthorized user
const validateAuth = (
  controller: NextApiHandlerExtended
): NextApiHandlerExtended => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.T_ACCESS_TOKEN || req.headers.authorization;
    let user = null;
    if (token) {
      try {
        const key = new TextEncoder().encode(process.env.TOKENSECRET);
        const { payload } = await jose.jwtVerify(token, key);
        const id = payload.id as number;
        user = await prisma.user.findUnique({
          where: { id: id },
          select: {
            id: true,
            firstname: true,
            email: true,
            createdat: true,
            imageurl: true,
            updatedat: true,
          },
        });
        if (!user) {
          throw new Error("Not a real User");
        }
      } catch (error) {
        return res.status(401).json(null);
      }
    }
    return controller(req, res, user);
  };
};

export default validateAuth;

export const validateToken = async (token: string) => {
  const { payload } = await jose.jwtVerify(
    token,
    new TextEncoder().encode(process.env.TOKENSECRET)
  );
  return payload;
};
