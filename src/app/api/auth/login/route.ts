import { COOKIE_NAME, MAX_AGE } from "@/constants";
import GraphQL from "@/functions/GraphQL";
import { LOGIN_MUTATION } from "@/graphql";
import axios, { AxiosError } from "axios";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { username, password } = body;
  try {
    const { data } = await GraphQL({
      endpoint: "http://localhost:8080/graphql",
      query: LOGIN_MUTATION,
      variables: {
        input: {
          username,
          password,
        },
      },
    });

    const seralized = serialize(COOKIE_NAME, data.loginUser, {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log(
          "From Server Detailed error response:",
          axiosError.response.data
        );
      }
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
