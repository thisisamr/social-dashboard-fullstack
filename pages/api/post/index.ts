// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "../../../lib/Auth";
import { prisma } from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        auhtor: true,
        comments: {
          include: {
            author: true,
          },
        },
        likes: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdat: "desc",
      },
    });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).send(error);
  }
}
