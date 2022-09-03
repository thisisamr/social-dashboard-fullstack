import type { NextApiRequest, NextApiResponse } from "next";
import { number } from "yup";
import { validateToken } from "../../../lib/Auth";
import { prisma } from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const token = req.cookies.T_ACCESS_TOKEN || req.headers.authorization;
  const { id } = req.body;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "bad user Input" });
  }
  if (req.method !== "POST") {
    return res.status(404).json({ error: "unsupported http verb" });
  }
  if (!token) {
    return res.status(401).json({ error: "no auth" });
  }
  try {
    const user = await validateToken(token);
    const deleted = await prisma.post.deleteMany({
      where: {
        id,
        AND: {
          authorid: user?.id,
        },
      },
    });
    if (deleted.count == 0) {
      return res.status(400).json({ error: "bad Request" });
    }
    return res.status(200).json({ id: id });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
