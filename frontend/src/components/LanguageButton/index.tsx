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
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white dark:bg-primary-dark dark:text-white font-medium rounded-full shadow-md hover:bg-primary-light dark:hover:bg-primary-light transition-all"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        🌐 {currentLocale.toUpperCase()}
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={18}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 z-10 transition-all"
          role="menu"
          aria-orientation="vertical"
        >
          {["en", "ar"].map((locale) => (
            <button
              key={locale}
              onClick={() => changeLocale(locale)}
              className={
                "w-full text-left px-5 py-3 text-sm transition hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
              }
              role="menuitem"
            >
              {locale === "en" ? "English" : "العربية"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
