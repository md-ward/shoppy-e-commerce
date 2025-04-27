"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  User,
  ShoppingCart,
  LayoutGrid,
  Settings,
  BarChart2,
  Package,
  Tag,
  Home,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const t = useTranslations("AdminSidebar");

  const navItems = [
    {
      href: "/admin",
      label: t("dashboard"),
      icon: <Home size={20} />,
    },
    {
      href: "/admin/orders",
      label: t("orders"),
      icon: <ShoppingCart size={20} />,
    },
    {
      href: "/admin/products",
      label: t("products"),
      icon: <Package size={20} />,
      dropdown: [
        { href: "/admin/products", label: t("products") },
        { href: "/admin/products/add", label: t("addProduct") },
      ],
    },
    {
      href: "/admin/categories",
      label: t("categories"),
      icon: <LayoutGrid size={20} />,
    },
    {
      href: "/admin/coupons",
      label: t("coupons"),
      icon: <Tag size={20} />,
    },
    {
      href: "/admin/users",
      label: t("customers"),
      icon: <User size={20} />,
    },
    {
      href: "/admin/analytics",
      label: t("analytics"),
      icon: <BarChart2 size={20} />,
    },
    {
      href: "/admin/settings",
      label: t("settings"),
      icon: <Settings size={20} />,
    },
  ];

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };
  const pathname = usePathname();
  const isActive = (href: string) => {
    // alert(pathname);
    return pathname == "/ar" + href || pathname == "/en" + href;
  };

  return (
    <aside className="from-primary to-primary-dark text-foreground-dark top-0 left-0 h-screen w-[18%] bg-gradient-to-b shadow-lg">
      <div className="flex h-full flex-col p-6">
        <div className="mb-8">
          <h1 className="text-center text-2xl font-bold tracking-wide">
            Admin
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item, index) => (
            <div
              className={`${isActive(item.href) && !item.dropdown ? "bg-secondary text-foreground rounded-md shadow" : ""}`}
              key={index}
            >
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="hover:bg-primary-light hover:text-foreground-light flex w-full items-center justify-between gap-2 rounded-lg p-3 transition"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-md font-medium">{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                      size={18}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="mt-1 ml-8 flex flex-col space-y-1">
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className={`hover:bg-primary-light hover:text-foreground-light rounded-lg p-2 text-sm transition ${isActive(subItem.href) ? "bg-secondary text-foreground rounded-md shadow" : ""} `}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="hover:bg-primary-light hover:text-foreground-light flex items-center gap-4 rounded-lg p-3 transition"
                >
                  {item.icon}
                  <span className="text-md font-medium">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="text-muted-foreground mt-6 text-center text-xs">
          © 2025 Your Company
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
