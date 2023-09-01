import { MAX_AGE } from "@/constants";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { username, password } = body;

  if (username != "admin" || password != "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || "";

  const token = sign({ username }, secret, { expiresIn: MAX_AGE });

  const seralized = serialize("OutSiteJWT", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = {
    message: "Authenticated!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": seralized },
  });
}
