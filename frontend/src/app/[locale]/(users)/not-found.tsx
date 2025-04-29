import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
const NotFoundPage = () => {
  const t = useTranslations("NotFound");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <Link href="/">
        {" "}
        <p className="text-primary mt-4 underline">{t("message")}</p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
