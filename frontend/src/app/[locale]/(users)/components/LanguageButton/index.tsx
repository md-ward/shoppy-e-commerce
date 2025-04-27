"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const LanguageButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const changeLocale = (locale: string) => {
    const newPathname = pathname.replace(/^\/(ar|en)/, `/${locale}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <span
      className="hover:bg-primary-light **:select-none cursor-pointer dark:hover:bg-primary-light inline-flex items-center gap-2 rounded-full p-2 font-medium text-white transition-all dark:text-white"
      onClick={() => setIsOpen(!isOpen)}
      aria-haspopup="true"
      aria-expanded={isOpen}
    >
      {/* {isOpen && <div className="h-[1rem] w-0.5 bg-white"></div>} */}
      <span
        className={`relative ${isOpen ? "w-32" : "-z-10 w-0"} flex flex-row items-center gap-2 overflow-hidden transition-all duration-300`}
      >
        {["en", "ar"].map((locale) => (
          <button
            key={locale}
            onClick={() => changeLocale(locale)}
            className={`hover:bg-accent rounded-xl p-1 px-2 text-left text-sm transition dark:hover:bg-gray-800 ${locale === currentLocale ? "bg-accent" : ""}`}
            role="menuitem"
          >
            {locale === "en" ? "English" : "العربية"}
          </button>
        ))}
      </span>

      <span className="flex items-center gap-2">
        🌐 {currentLocale.toUpperCase()}
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
          size={18}
        />
      </span>
    </span>
  );
};

export default LanguageButton;
