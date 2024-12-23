"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "./Footer";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="flex gap-4 mb-12 cursor-pointer items-center "
        >
          <Image
            className="size-[24px] max-xl:size-14"
            src={"/icons/logo.svg"}
            height={32}
            width={32}
            alt="Laxmi Chit Fund Logo"
          />
          <h1 className="sidebar-logo">Laxmi Chit Fund</h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
            >
              <div className="relative size-6">
                <Image
                  className={cn({ "brightness-[3] invert-0": isActive })}
                  fill
                  src={item.imgURL}
                  alt={item.label}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}
        USER
      </nav>
      <Footer user={user}></Footer>
    </section>
  );
};

export default Sidebar;
