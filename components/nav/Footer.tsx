import { BeaverMark } from "@/components/ui/BeaverMark";
import { AppStoreButton } from "@/components/ui/AppStoreButton";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-bg/80 mt-20">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-14 md:grid-cols-3 md:px-10">
        <div>
          <div className="flex items-center gap-2">
            <BeaverMark size={28} />
            <span className="text-[17px] font-bold tracking-tight">Beaver</span>
          </div>
          <p className="mt-3 max-w-xs text-[13px] text-text-muted">
            To do, but together. Daily lists, streaks, and trusted friends in your corner.
          </p>
        </div>
        <div className="md:col-span-1">
          <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-dim">
            Product
          </h4>
          <ul className="mt-3 space-y-2 text-[14px]">
            <li><a href="#features" className="text-text-muted hover:text-text">Features</a></li>
            <li><a href="#friends" className="text-text-muted hover:text-text">Friends</a></li>
            <li><a href="#pricing" className="text-text-muted hover:text-text">Pricing</a></li>
            <li><a href="#faq" className="text-text-muted hover:text-text">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-dim">
            Get the app
          </h4>
          <p className="mt-3 text-[13px] text-text-muted">
            Beaver is live on the App Store. Tap below to start building your dam.
          </p>
          <div className="mt-3">
            <AppStoreButton label="Join the waitlist" size="sm" />
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-2 px-6 py-6 text-[12px] text-text-dim md:flex-row md:items-center md:px-10">
          <span>© {new Date().getFullYear()} Beaver. Built between two logs.</span>
          <span className="flex items-center gap-4">
            <a href="#" className="hover:text-text-muted">Privacy</a>
            <a href="#" className="hover:text-text-muted">Terms</a>
            <a href="#" className="hover:text-text-muted">Contact</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
