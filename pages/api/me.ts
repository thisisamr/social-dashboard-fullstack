// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { User } from "@prisma/client";
// import type { NextApiRequest, NextApiResponse } from "next";

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<User | null>
// ) {
//   return res.json(null);
// }
import validateRoute from "../../lib/Auth";
export default validateRoute(async (req, res, user) => {
  res.json({ ...user });
});
