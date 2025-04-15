// import FeaturedProducts from "./components/featuredProducts";

import { useTranslations } from "next-intl";

const HomePage = () => {
  const t = useTranslations("Home");
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <br />
      {/* <FeaturedProducts /> */}
      <h1>{t("title")}</h1>
    </div>
  );
};

export default HomePage;
