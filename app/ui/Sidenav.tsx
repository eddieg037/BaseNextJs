"use client";

import {
  CircleStackIcon,
  LockClosedIcon,
  TableCellsIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Login", href: "/login", icon: LockClosedIcon },
  { name: "Dashboard", href: "/dashboard", icon: TableCellsIcon },
  { name: "Import Data", href: "/import", icon: CircleStackIcon },
];

export default function SideNav() {
  const pathname = usePathname() ?? "";

  return (
    <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-4 h-screen sidenav">
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
      </div>
    </aside>
  );
}
