"use client";
import { getUser } from "@/data/getUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuthentication() {
  const [isAuth, setAuth] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const { user, error } = await getUser();

      if (error) {
        push("/login");
        return;
      }

      setAuth(true);
    };

    checkAuthentication();
  }, [push]);

  return { isAuth };
}
