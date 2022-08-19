import { Like, Post, User, Comment } from "@prisma/client";
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
  createdat?: Date;
  updatedat?: Date;
  email: string;
  firstname: string;
  imageurl?: string | null;
}
export interface NextApiHandlerExtended {
  (
    req: NextApiRequest,
    res: NextApiResponse,
    user?: AuthUserObject | null
  ): void;
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

export type IPostWithAutherCommentsLikes = Post & {
  auhtor: User;
  comments: (Comment & {
    author: User;
  })[];
  likes: (Like & {
    author: User;
  })[];
};
export type CommentwithAuthor = Comment & {
  author: {
    id: number;
    email: string;
    firstname: string;
    imageurl: string | null;
  };
};
