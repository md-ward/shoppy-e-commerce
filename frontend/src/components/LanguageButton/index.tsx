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
    <div className="relative inline-block  text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary dark:bg-primary-dark hover:bg-primary-light dark:hover:bg-primary-light inline-flex items-center gap-2 rounded-full p-2 font-medium text-white shadow-md transition-all dark:text-white"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {isOpen &&
          ["en", "ar"].map((locale) => (
            <button
              key={locale}
              onClick={() => changeLocale(locale)}
              className={
                "rounded-xl text-left text-sm transition hover:bg-gray-100 dark:hover:bg-gray-800"
              }
              role="menuitem"
            >
              {locale === "en" ? "English" : "العربية"}
            </button>
          ))}
        <span className="flex flex-row items-center gap-2">
          🌐 {currentLocale.toUpperCase()}
          <ChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
            size={18}
          />
        </span>
      </button>
    </div>
  );
};

export default LanguageButton;
