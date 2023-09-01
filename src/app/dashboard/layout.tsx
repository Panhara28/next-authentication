"use client";

import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    first;

    return () => {
      second;
    };
  }, [third]);

  return (
    <main>
      <header>Navigation</header>
      {children}
    </main>
  );
}
