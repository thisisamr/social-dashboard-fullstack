import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface jwtUser {
  email: string;
  id: number;
  time: number;
  iat: number;
  exp: number;
}
export interface AuthUserObject {
  id: number;
  createdat: Date;
  updatedat: Date;
  email: string;
  firstname: string;
  imageurl: string | null;
}
export interface NextApiHandlerExtended {
  (req: NextApiRequest, res: NextApiResponse, user?: AuthUserObject): void;
}
export interface authReq {
  email: string | null;
  password: string | null;
  avatar?: string;
  firstname?: string;
}
export enum authMode {
  SIGNIN = "signin",
  SIGNUP = "signup",
}
