import bcrybt from "bcrypt";
import * as jose from "jose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { jwtUser, NextApiHandlerExtended } from "./types";
import { prisma } from "../prisma/prisma";

const validateAuth = (
  controller: NextApiHandlerExtended
): NextApiHandlerExtended => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.T_ACCESS_TOKEN || req.headers.authorization;
    if (token) {
      let user;
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
          },
        });
        console.log(user, "the user");
        if (!user) {
          throw new Error("Not a real User");
        }
      } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Not Authorized" });
      }
      // need to create an interface IAuthUser to reflect the type returned from the db
      return controller(req, res, user);
    } else {
      return res.status(401).json({ error: "Not Authorized" });
    }
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
