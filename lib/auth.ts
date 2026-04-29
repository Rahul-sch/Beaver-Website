"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useDemoStore } from "./store";

export const validate = {
  email: (v: string) => /\S+@\S+\.\S+/.test(v.trim()),
};

export function useAuth() {
  const clerk = useClerk();
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const localUser = useDemoStore((s) => s.user);

  return {
    isLoaded,
    isSignedIn: !!isSignedIn,
    clerkUser,
    user: localUser,
    signOut: () => clerk.signOut(),
  };
}
