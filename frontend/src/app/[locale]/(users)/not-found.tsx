import { useTranslations } from "next-intl";
import Link from "next/link";
const NotFoundPage = () => {
  const t = useTranslations("NotFound");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <Link href="/">
        {" "}
        <p className="mt-4 text-primary underline">{t("message")}</p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
