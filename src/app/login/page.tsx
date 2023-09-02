"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { push } = useRouter();
  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      currentTarget: { username, password },
    } = e;
    const payload = {
      username: username.value,
      password: password.value,
    };

    try {
      await axios.post("/api/auth/login", payload);
      push("/dashboard");
    } catch (err) {
      const error = err as AxiosError;
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.log("Detailed error response:", axiosError.response.data);
        }
      }
    }
  };
  return (
    <>
      <form onSubmit={onLogin}>
        <input type="text" name="username" placeholder="Username" />
        <br />
        <input type="password" name="password" placeholder="Password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
