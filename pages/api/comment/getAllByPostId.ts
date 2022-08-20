// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "../../../lib/Auth";
import { prisma } from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "unsupported http verb" });
  }
  // const token = req.cookies.T_ACCESS_TOKEN || req.headers.authorization;
  // if (!token) {
  //   return res.status(401).json({ message: "no auth" });
  // }
  try {
    // const user = await validateToken(token);
    const { pid } = req.body;
    const comments = await prisma.comment.findMany({
      where: {
        postid: pid,
      },
      include: {
        author: {
          select: {
            email: true,
            firstname: true,
            imageurl: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdat: "desc",
      },
    });
    return res.status(200).json(comments);
  } catch (error: Error | any) {
    return res.status(401).json({ error: error.message });
  }
}
