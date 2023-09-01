"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
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
      const { data } = await axios.post("/api/auth/login", payload);
      alert(JSON.stringify(data));
      push("/dashboard");
    } catch (err) {
      const error = err as AxiosError;
      alert(error);
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
