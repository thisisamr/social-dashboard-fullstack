// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "../../../lib/Auth";
import { prisma } from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const token = req.cookies.T_ACCESS_TOKEN || req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "no auth" });
  }
  if (req.method !== "POST") {
    return res.status(404).json({ message: "unsupported http verb" });
  }
  try {
    const user = await validateToken(token);
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Bad input" });
    }
    const postCreated = await prisma.post.create({
      data: {
        text,
        auhtor: {
          connect: {
            email: user.email as string,
          },
        },
      },
    });
    return res.status(201).json(postCreated);
  } catch (error) {
    return res.status(401).send(error);
  }
}
