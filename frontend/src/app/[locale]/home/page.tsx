import { Pen, ShoppingBag, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export const Hero = () => {
  const t = useTranslations("Home");
  return (
    <section className="bg-secondary mt-2 dark:bg-secondary-dark dark:text-foreground-dark h-96 flex justify-center flex-col items-center py-16 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">{t("heroTitle")}</h1>
      <p className="text-lg mb-6">{t("heroSubtitle")}</p>
      <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-light transition">
        {t("startCustomizing")}
      </button>
    </section>
  );
};
export const FeaturedCategories = () => {
  const t = useTranslations("Home");

  const imgAndSection = [
    { img: "/mug.jpg", section: t("mugs") },
    { img: "/notebook.jpeg", section: t("notebooks") },
    { img: "/pen.jpg", section: t("pens") },
    { img: "/stickers.avif", section: t("stickers") },
  ];

  return (
    <section className="py-12 px-6">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl justify-between mx-auto items-center">
        <h2 className="text-2xl font-semibold text-center mb-8">
          {t("shopByCategory")}
        </h2>
        <button className="bg-primary text-white h-[1.5lh] w-fit rounded-md px-3 hover:cursor-pointer ring ring-primary-light dark:bg-transparent hover:bg-primary-light transition">
          {t("viewAll")}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {imgAndSection.map((cat, idx) => (
          <div
            key={idx}
            className="relative bg-secondary dark:bg-secondary-dark ring-primary ring-2 rounded-lg shadow-md p-4 text-center"
          >
            <div className="flex justify-center p-1 rounded mb-4">
              <Image src={cat.img} alt={cat.section} width={200} height={200} />
            </div>
            <p className="font-medium mb-2">{cat.section}</p>
            <button className="bg-primary text-white h-[1.5lh] w-[70%] rounded-md hover:cursor-pointer hover:bg-primary-light transition">
              {t("customize")}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export const HowItWorks = () => {
  const t = useTranslations("Home");

  const steps = [
    { step: "1", title: t("step1"), icon: <Pen /> },
    { step: "2", title: t("step2"), icon: <Upload /> },
    { step: "3", title: t("step3"), icon: <ShoppingBag /> },
  ];

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-semibold text-center mb-8">
        {t("howItWorks")}
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
        {steps.map(({ step, title, icon }) => (
          <div
            key={step}
            className="flex-1 bg-secondary dark:bg-secondary-dark rounded shadow-md p-6 text-center"
          >
            <div className="text-3xl font-bold flex items-center justify-center flex-col gap-2 text-accent mb-2">
              <span className="bg-accent size-fit p-2 text-secondary rounded-full">
                {icon}
              </span>
              {step}
            </div>
            <h3 className="font-medium text-lg dark:text-background">
              {title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const t = useTranslations("Home");

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-semibold text-center mb-8">
        {t("testimonialsTitle")}
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="rounded-md bg-gradient text-white p-4 shadow-md"
          >
            <p className="mb-2">“{t("testimonialText")}”</p>
            <p className="text-sm text-right">{t("customer")}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Homepage = () => (
  <>
    <Hero />
    <FeaturedCategories />
    <HowItWorks />
    <Testimonials />
  </>
);

export default Homepage;
