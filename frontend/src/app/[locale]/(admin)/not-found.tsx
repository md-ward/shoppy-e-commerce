import { useTranslations } from "next-intl";
import Link from "next/link";
const NotFoundPage = () => {
  const t = useTranslations("NotFound");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-accent">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <Link href="/">
        {" "}
        <p className="text-primary mt-4 underline">{t("message")}</p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
