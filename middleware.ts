import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

// import { prisma } from "../prisma/prisma";
const signedinPages = ["/profile"];
export default async function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get("T_ACCESS_TOKEN");
    const url = req.nextUrl.clone();
    url.pathname = "/";
    if (!token) {
      return NextResponse.redirect(url);
    } else {
      try {
        const { payload } = await jose.jwtVerify(
          token,
          new TextEncoder().encode(process.env.TOKENSECRET)
        );
        if (payload == null) {
          return NextResponse.redirect(url);
        }
      } catch (error) {
        console.log(error);
        return NextResponse.redirect(url);
      }
      return;
    }
  }
}
