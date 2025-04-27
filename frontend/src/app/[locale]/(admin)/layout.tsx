import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../../../globals.css";
import AdminSidebar from "./components/Sidebar";
import { headers } from "next/headers";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const currentPath = (await headers()).get("x-current-path");


  return (
    <html lang={locale}>
      <body className="bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark relative flex min-h-screen flex-col items-center">
        <NextIntlClientProvider locale={locale}>
          <main className="flex w-full flex-row">
            {currentPath?.match(/^\/(en|ar)\/admin/) &&
              !currentPath.match(/^\/(en|ar)\/admin\/login/) && (
                <AdminSidebar />
              )}
            <div className="w-full">{children}</div>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
