"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // exact or nested match, e.g. /recipes covers /recipes/[id] too
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const linkClass = (href: string) => isActive(href) ? "font-bold" : "opacity-80 hover:opacity-100";

  return (
    <div className="flex gap-4 p-4 mb-4 bg-[#0077BB] text-white">
      <Link href="/" className={linkClass("/")}>
        Home
      </Link>
      <Link href="/planning" className={linkClass("/planning")}>
        Planning
      </Link>
      <Link href="/shopping" className={linkClass("/shopping")}>
        Shopping
      </Link>
      <Link href="/recipes" className={linkClass("/recipes")}>
        Recipes
      </Link>
    </div>
  );
}
