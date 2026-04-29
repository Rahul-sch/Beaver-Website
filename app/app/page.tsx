import { PhoneFrame } from "@/components/demo/PhoneFrame";
import { DemoApp } from "@/components/demo/DemoApp";
import { DemoResetButton } from "@/components/demo/DemoResetButton";
import Link from "next/link";

export default function FullscreenDemo() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 pt-12 pb-20">
      <div className="text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
          Live demo
        </p>
        <h1 className="mt-2 text-[36px] font-extrabold tracking-tight md:text-[48px]">
          Tap around. Cross things off.
        </h1>
        <p className="mt-3 max-w-md text-[15px] text-text-muted md:text-[17px]">
          Everything is interactive. Your changes save locally — refresh and they&apos;ll still be there.
        </p>
      </div>
      <div
        className="relative"
        style={{ filter: "drop-shadow(0 30px 80px rgba(10,132,255,0.30))" }}
      >
        <PhoneFrame width={360}>
          <DemoApp />
        </PhoneFrame>
      </div>
      <div className="flex items-center gap-4">
        <DemoResetButton />
        <Link href="/" className="text-xs uppercase tracking-[0.16em] text-text-muted hover:text-text">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
