"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { BeaverMark } from "@/components/ui/BeaverMark";
import { Button } from "@/components/ui/Button";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export function TopNav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]);
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(12px)"]);
  const border = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.06)"]
  );

  return (
    <motion.header
      style={{ background: bg, backdropFilter: blur, borderBottomColor: border }}
      className="sticky top-0 z-50 w-full border-b"
    >
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <BeaverMark size={28} />
          <span className="text-[17px] font-bold tracking-tight">Beaver</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <a href="#features" className="text-[14px] text-text-muted hover:text-text">
            Features
          </a>
          <a href="#friends" className="text-[14px] text-text-muted hover:text-text">
            Friends
          </a>
          <a href="#pricing" className="text-[14px] text-text-muted hover:text-text">
            Pricing
          </a>
          <a href="#demo" className="text-[14px] text-text-muted hover:text-text">
            Demo
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Sign up</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: { userButtonAvatarBox: "h-8 w-8" },
              }}
            />
          </Show>
        </div>
      </div>
    </motion.header>
  );
}
