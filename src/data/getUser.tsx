import axios, { AxiosError } from "axios";

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

export async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/auth/me");
    return {
      user: data,
      error: data.status,
    };
  } catch (e) {
    const error = e as AxiosError;
    return {
      user: null,
      error,
    };
  }
}
