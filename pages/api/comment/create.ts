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
    return res.status(401).json({ error: "no auth" });
  }
  if (req.method !== "POST") {
    return res.status(404).json({ error: "unsupported http verb" });
  }
  try {
    const user = await validateToken(token);
    const { text, pid } = req.body;
    if (!text || text.length == 0 || !pid) {
      return res.status(400).json({ error: "Bad input" });
    }
    const commentCreated = await prisma.comment.create({
      data: {
        text,
        post: { connect: { id: +pid } },
        author: {
          connect: {
            id: user?.id as number,
          },
        },
      },
    });

    return res.status(201).json(commentCreated);
  } catch (error: Error | any) {
    return res.status(400).json({ error: error.message });
  }
}
