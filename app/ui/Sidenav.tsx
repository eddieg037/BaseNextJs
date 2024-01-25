"use client";

import {
  CircleStackIcon,
  TableCellsIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();
  const links = [
    { name: "Dashboard", href: "/dashboard", icon: TableCellsIcon },
    { name: "Import Data", href: "/import", icon: CircleStackIcon },
  ];
  return (
    <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-4 h-screen sidenav">
        <h1 className="mb-2">MyBase</h1>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex h-[48px] mb-2 grow items-center gap-2 rounded-md bg-gray-500 p-3 text-sm font-large justify-start p-2 px-3"
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
