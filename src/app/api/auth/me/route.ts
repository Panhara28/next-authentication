import { COOKIE_NAME } from "@/constants";
import GraphQL from "@/functions/GraphQL";
import { ME } from "@/graphql";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return NextResponse.json({
      message: "Unauthorized",
      status: 401,
    });
  }

  const { data } = await GraphQL({
    endpoint: "http://localhost:8080/graphql",
    query: ME,
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  try {
    const { me } = data;

    if (!me) {
      return NextResponse.json(
        {
          message: "Unauthorized!",
        },
        {
          status: 401,
        }
      );
    }
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something Went Wrong!",
      },
      {
        status: 401,
      }
    );
  }
}
