"use client";
import useAuthentication from "@/hooks/useAuthentication";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth } = useAuthentication();

  if (!isAuth) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <header>Navigation</header>
      {children}
    </main>
  );
}
