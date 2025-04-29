"use client";
import { Moon, Search, Settings, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedSwitchingButton from "../AnimatedSwitchingButton";
import { useTranslations } from "next-intl";
import LanguageButton from "../LanguageButton";
import Cookies from "js-cookie";
import { Link } from "@/i18n/navigation";

const NavLinks = () => {
  const t = useTranslations("NavLinks");

  const links = [
    { href: "/", label: "home" },
    { href: "/shop", label: "shop" },
    { href: "/about", label: "about" },
    { href: "/contact", label: "contact" },
  ];

  return (
    <nav className="flex items-center justify-center gap-6 rounded-full bg-white/10 p-2 shadow-md backdrop-blur-md dark:bg-white/5">
      {links.map(({ href, label }) => (
        <Link
        replace
          key={href}
          href={href}
          className="hover:text-accent relative px-4 py-1.5 text-sm font-medium text-white transition-all duration-300"
        >
          {t(label)}
          <span
            className="bg-accent absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
            aria-hidden="true"
          ></span>
        </Link>
      ))}
    </nav>
  );
};

const Navbar = () => {
  const [toggleTheme, setToggleTheme] = useState<boolean>(false);
  function onSwitch() {
    const isDarkMode = document.body.classList.toggle("dark");
    Cookies.set("theme", isDarkMode ? "dark" : "light", { expires: 7 });
    setToggleTheme(!isDarkMode);
  }

  // Initialize theme based on cookie
  useEffect(() => {
    const savedTheme = Cookies.get("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setToggleTheme(true);
    } else {
      document.body.classList.remove("dark");
      setToggleTheme(false);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="bg-gradient flex w-full items-center justify-between rounded-b-2xl px-4 py-3 shadow-md">
      {/* Search Bar */}
      <div className="text-secondary dark:text-foreground relative flex-1">
        <div className="w-1/2">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
          <input
            type="search"
            placeholder="Search..."
            className="bg-background/70 text-foreground w-full rounded-full p-2 pl-10 text-sm placeholder-gray-500 focus:outline-none dark:bg-white"
          />
        </div>
      </div>

      {/* Nav Links */}
      <NavLinks />

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-end gap-2">
        <LanguageButton />
        <AnimatedSwitchingButton
          onSwitch={onSwitch}
          isEditable={toggleTheme}
          FirstIcon={
            <Sun className="h-6 w-6 cursor-pointer text-white transition hover:text-yellow-400" />
          }
          SecondIcon={
            <Moon className="h-6 w-6 cursor-pointer text-white transition hover:text-blue-300" />
          }
        />

        <Link href="/settings" className="rounded-full p-2 transition">
          <Settings className="h-6 w-6 cursor-pointer text-white transition hover:text-blue-300" />
        </Link>

        <div className="bg-secondary dark:bg-accent mx-2 hidden h-6 w-px md:inline-block"></div>

        <button
          onClick={handleSignOut}
          className="bg-accent hover:bg-primary-light hidden rounded-full px-4 py-2 text-xs font-semibold text-white transition-all md:block"
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
