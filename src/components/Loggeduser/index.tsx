"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function Loggeduser() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) return null;

  return <UserButton showName />;
}
