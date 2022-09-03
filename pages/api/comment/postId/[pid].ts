// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "../../../../lib/Auth";
import { prisma } from "../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "unsupported http verb" });
  }
  const { pid } = req.query;
  if (isNaN(+(pid as string))) {
    return res.status(400).json({ error: "Bad Request" });
  }
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postid: +(pid as string),
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
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
}
