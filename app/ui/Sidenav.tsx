"use client";

import {
  CircleStackIcon,
  TableCellsIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/app/providers/AuthProvider";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: TableCellsIcon },
  { name: "Import Data", href: "/import", icon: CircleStackIcon },
];

export default function SideNav() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="flex h-screen flex-col p-4 sidenav">
        <h1 className="mb-4 text-xl font-semibold">MyBase</h1>
        <nav className="space-y-2">
          {links.map((link) => {
            const LinkIcon = link.icon;
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex h-[48px] items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-gray-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <LinkIcon className="w-5" />
                <span className="hidden md:block">{link.name}</span>
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => {
            logout();
            router.replace("/login");
          }}
          className="mt-auto flex h-[48px] items-center justify-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
