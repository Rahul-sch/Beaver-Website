"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useDemoStore } from "@/lib/store";

const COLORS = ["#0A84FF", "#30D158", "#FF9F0A", "#BF5AF2", "#FF453A", "#64D2FF"];
function colorFor(seed: string) {
  return COLORS[Math.abs([...seed].reduce((a, c) => a + c.charCodeAt(0), 0)) % COLORS.length];
}

export function ClerkUserSync() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    const state = useDemoStore.getState();
    if (isSignedIn && user) {
      const name =
        user.fullName?.trim() ||
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.username ||
        user.primaryEmailAddress?.emailAddress?.split("@")[0] ||
        "Beaver";
      const email = user.primaryEmailAddress?.emailAddress ?? "";
      const seed = email || user.id;
      state.setUserFromClerk({
        id: user.id,
        name,
        email,
        avatarColor: colorFor(seed),
      });
    } else {
      state.clearUser();
    }
  }, [isLoaded, isSignedIn, user]);

  return null;
}
