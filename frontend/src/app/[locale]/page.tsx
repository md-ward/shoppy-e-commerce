import FeaturedProducts from "@/components/Products/featuredProducts";
import { useTranslations } from "next-intl";

const HomePage = () => {
  const t = useTranslations("Home");

  return (
    <div className="flex flex-1 flex-col  p-2">
      <h1 className="text-2xl font-bold text-start w-full">{t("featured")}</h1>
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
