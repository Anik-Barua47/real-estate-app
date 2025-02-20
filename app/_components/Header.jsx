"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const path = usePathname();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    // console.log(path);
  }, []);

  return (
    <div className="flex justify-between p-6 px-10 shadow-sm fixed top-0 w-full z-50 bg-white">
      <div className="flex gap-12 items-center">
        <Link href={"/"}>
          <Image
            alt="Logo"
            src="/logo.svg"
            width={150}
            height={150}
            priority
            className="h-auto"
          />
        </Link>
        <ul className="flex gap-10">
          <Link href={"/"}>
            <li
              className={`hover:text-[#1B3D5B] font-medium text-sm cursor-pointer ${
                path == "/" && `text-[#1B3D5B] font-extrabold`
              }`}
            >
              For Sell
            </li>
          </Link>
          <Link href={"/rent"}>
            <li
              className={`hover:text-[#1B3D5B] font-medium text-sm cursor-pointer ${
                path == "/rent" && `text-[#1B3D5B] font-extrabold`
              }`}
            >
              For Rent
            </li>
          </Link>

          <li className="hover:text-[#1B3D5B] font-medium text-sm cursor-pointer">
            Agent Finder
          </li>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <Link href={"/add-new-listing"}>
          <Button className="flex gap-2">
            <Plus className="h-5 w-5" /> Post Your Ad
          </Button>
        </Link>
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user?.imageUrl}
                width={35}
                height={35}
                alt="user profile"
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/user"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>My Listing</DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/sign-in"}>
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
