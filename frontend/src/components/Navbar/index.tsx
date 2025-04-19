"use client";
import { Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AnimatedSwitchingButton from "../AnimatedSwitchingButton";
import { useTranslations } from "next-intl";

const NavLinks = () => {
  const t = useTranslations("NavLinks");

  const links = [
    { href: "/", label: "home" },
    { href: "/about", label: "about" },
    { href: "/contact", label: "contact" },
  ];

  return (
    <nav className="flex items-center   justify-center  gap-6 bg-white/10 backdrop-blur-md p-2 rounded-full shadow-md dark:bg-white/5">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="relative px-4 py-1.5 text-sm font-medium text-white hover:text-accent transition-all duration-300"
        >
          {t(label)}
          <span
            className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full"
            aria-hidden="true"
          ></span>
        </Link>
      ))}
    </nav>
  );
};

const Navbar = () => {
  const [toggleTheme, setToggleTheme] = useState<boolean>(false);

  const handleSignOut = async () => {
    try {
      signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="flex  items-center justify-between px-4 py-3 backdrop-blur-md bg-gradient-to-tl  from-primary/70  to-indigo-500 dark:bg-primary-light/70 shadow-md rounded-b-2xl  w-full">
      {/* Search Bar */}
      <div className="flex  items-center relative  ">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary dark:text-white h-5 w-5" />
        <input
          type="search"
          placeholder="Search..."
          className="w-full rounded-full  bg-background/70 dark:bg-white  p-2 pl-10 text-sm text-foreground placeholder-gray-500   focus:outline-none dark:text-white dark:placeholder-white"
        />
      </div>

      {/* Nav Links */}
      <NavLinks />

      {/* Right Section */}
      <div className="flex  items-center justify-end">
        <AnimatedSwitchingButton
          onSwitch={() => document.body.classList.toggle("dark")}
          isEditable={toggleTheme}
          handleEditToggle={() => setToggleTheme(!toggleTheme)}
          FirstIcon={
            <Sun className="h-6 w-6 cursor-pointer text-white hover:text-yellow-400 transition" />
          }
          SecondIcon={
            <Moon className="h-6 w-6 cursor-pointer text-white hover:text-blue-300 transition" />
          }
        />

        <Link
          href="/settings"
          className="p-2 rounded-full hover:bg-secondary dark:hover:bg-secondary transition"
        >
          <Settings className="h-6 w-6 text-white" />
        </Link>

        <div className="hidden md:inline-block h-6 w-px bg-secondary dark:bg-accent mx-2"></div>

        <button
          onClick={handleSignOut}
          className="hidden md:block rounded-full bg-accent hover:bg-primary-light transition-all px-4 py-2 text-xs font-semibold text-white"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};

export default Navbar;

function signOut() {
  throw new Error("Function not implemented.");
}
