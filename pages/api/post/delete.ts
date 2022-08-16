import type { NextApiRequest, NextApiResponse } from "next";
import { number } from "yup";
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
  const user = await validateToken(token);
  if (req.method !== "POST") {
    return res.status(404).json({ error: "unsupported http verb" });
  }
  const { id } = req.body;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "bad user Input" });
  }
  //go to the database
  try {
    //check if the post.author.id = user.id
    const found = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (found?.authorid === user.id) {
      const deleted = await prisma.post.delete({
        where: {
          id,
        },
      });
      return res.status(200).json({ id: deleted.id });
    } else {
      return res
        .status(401)
        .json({ error: "not authorized to delete this post" });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
