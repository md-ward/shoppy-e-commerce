"use client";
import {
  Moon,
  Search,
  Settings,
  ShoppingBasket,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedSwitchingButton from "../AnimatedSwitchingButton";
import { useTranslations } from "next-intl";
import LanguageButton from "../LanguageButton";
import Cookies from "js-cookie";
import { Link } from "@/i18n/navigation";

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  const t = useTranslations("NavLinks");

  const links = [
    { href: "/", label: "home" },
    { href: "/shop", label: "shop" },
    { href: "/about", label: "about" },
    { href: "/contact", label: "contact" },
  ];

  return (
    <nav
      className={`${
        isMobile
          ? "flex flex-col items-start gap-4 p-4"
          : "hidden items-center justify-center gap-6 rounded-full bg-white/10 p-2 shadow-md backdrop-blur-md dark:bg-white/5 md:flex"
      }`}
    >
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("Cart");

  function onSwitch() {
    const isDarkMode = document.body.classList.toggle("dark");
    Cookies.set("theme", isDarkMode ? "dark" : "light", { expires: 7 });
    setToggleTheme(!isDarkMode);
  }

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
    <header className="bg-gradient w-full px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* Left: Search */}
        <div className="text-secondary dark:text-foreground relative flex-1">
          <div className="w-full md:w-1/2">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search..."
              className="bg-background/70 text-foreground w-full rounded-full p-2 pl-10 text-sm placeholder-gray-500 focus:outline-none dark:bg-white"
            />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="z-50 ml-4 block p-2 text-white md:hidden"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Nav Links */}
        <NavLinks />

        {/* Right Section */}
        <div className="ml-4 hidden flex-1 items-center justify-end gap-2 md:flex">
          <Link
            title={t("title")}
            href="/cart"
            className="rounded-full p-2 text-white transition"
          >
            <ShoppingBasket />
          </Link>
          <div className="bg-secondary dark:bg-accent mx-2 hidden h-6 w-px md:inline-block"></div>

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
            login
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mt-4 md:hidden">
          <NavLinks isMobile />
          <div className="mt-4 flex flex-col gap-3 px-4">
            <div className="flex items-center gap-3">
              <Link
                title={t("title")}
                href="/cart"
                className="rounded-full p-2 text-white transition"
              >
                <ShoppingBasket />
              </Link>
              <Link href="/settings" className="rounded-full p-2 text-white transition">
                <Settings />
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <LanguageButton />
              <AnimatedSwitchingButton
                onSwitch={onSwitch}
                isEditable={toggleTheme}
                FirstIcon={
                  <Sun className="h-6 w-6 text-white transition hover:text-yellow-400" />
                }
                SecondIcon={
                  <Moon className="h-6 w-6 text-white transition hover:text-blue-300" />
                }
              />
            </div>
            <button
              onClick={handleSignOut}
              className="bg-accent hover:bg-primary-light mt-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all"
            >
              login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

function signOut() {
  throw new Error("Function not implemented.");
}
