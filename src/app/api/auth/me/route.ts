import { cookies } from "next/headers";

export default function GET() {
  const cookieStore = cookies();

  console.log({ cookieStore });
}
