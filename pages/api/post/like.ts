import type { NextApiRequest, NextApiResponse } from "next";
import { number } from "yup";
import { validateToken } from "../../../lib/Auth";
import { prisma } from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const token = req.cookies.T_ACCESS_TOKEN || req.headers.authorization;
  if (req.method !== "POST") {
    return res.status(404).json({ error: "unsupported http verb" });
  }
  if (!token) {
    return res.status(401).json({ error: "no auth" });
  }
  const { pid } = req.body;
  if (!pid || isNaN(pid)) {
    return res.status(400).json({ error: "bad user Input" });
  }
  try {
    const user = await validateToken(token);
    const found = await prisma.like.findMany({
      where: {
        authorid: user?.id,
        postid: pid,
      },
    });
    if (found.length > 0) {
      return res.status(400).json({ error: "you cannot like a post twice" });
    }
    //go a create a like
    const like = await prisma.like.create({
      data: {
        post: {
          connect: {
            id: +pid,
          },
        },
        author: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    return res.status(201).json(like);
  } catch (error) {
    return res.status(400).json(error);
  }
}
