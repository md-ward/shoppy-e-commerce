import { Pen, ShoppingBag, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Hero: React.FC = () => {
  const t = useTranslations("Home");
  return (
    <section className="bg-secondary dark:bg-secondary-dark dark:text-foreground-dark mt-2 flex h-96 flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="mb-4 text-4xl font-bold">{t("heroTitle")}</h1>
      <p className="mb-6 text-lg">{t("heroSubtitle")}</p>
      <button className="bg-primary hover:bg-primary-light rounded-full px-6 py-3 text-white transition">
        {t("startCustomizing")}
      </button>
    </section>
  );
};
const FeaturedCategories: React.FC = () => {
  const t = useTranslations("Home");

  const imgAndSection = [
    { img: "/mug.jpg", section: t("mugs") },
    { img: "/notebook.jpeg", section: t("notebooks") },
    { img: "/pen.jpg", section: t("pens") },
    { img: "/stickers.avif", section: t("stickers") },
  ];

  return (
    <section className="px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <h2 className="mb-8 text-center text-2xl font-semibold">
          {t("shopByCategory")}
        </h2>
        <button className="bg-primary ring-primary-light hover:bg-primary-light h-[1.5lh] w-fit rounded-md px-3 text-white ring transition hover:cursor-pointer dark:bg-transparent">
          {t("viewAll")}
        </button>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
        {imgAndSection.map((cat, idx) => (
          <div
            key={idx}
            className="bg-secondary dark:bg-secondary-dark ring-primary relative rounded-lg p-4 text-center shadow-md ring-2"
          >
            <div className="mb-4 flex justify-center rounded p-1">
              <Image src={cat.img} alt={cat.section} width={200} height={200} />
            </div>
            <p className="mb-2 font-medium">{cat.section}</p>
            <button className="bg-primary hover:bg-primary-light h-[1.5lh] w-[70%] rounded-md text-white transition hover:cursor-pointer">
              {t("customize")}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const HowItWorks: React.FC = () => {
  const t = useTranslations("Home");

  const steps = [
    { step: "1", title: t("step1"), icon: <Pen /> },
    { step: "2", title: t("step2"), icon: <Upload /> },
    { step: "3", title: t("step3"), icon: <ShoppingBag /> },
  ];

  return (
    <section className="px-6 py-12">
      <h2 className="mb-8 text-center text-2xl font-semibold">
        {t("howItWorks")}
      </h2>
      <div className="mx-auto flex max-w-5xl flex-col justify-center gap-8 md:flex-row">
        {steps.map(({ step, title, icon }) => (
          <div
            key={step}
            className="bg-secondary dark:bg-secondary-dark flex-1 rounded p-6 text-center shadow-md"
          >
            <div className="text-accent mb-2 flex flex-col items-center justify-center gap-2 text-3xl font-bold">
              <span className="bg-accent text-secondary size-fit rounded-full p-2">
                {icon}
              </span>
              {step}
            </div>
            <h3 className="dark:text-background text-lg font-medium">
              {title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  const t = useTranslations("Home");

  return (
    <section className="px-6 py-12">
      <h2 className="mb-8 text-center text-2xl font-semibold">
        {t("testimonialsTitle")}
      </h2>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="bg-gradient rounded-md p-4 text-white shadow-md"
          >
            <p className="mb-2">“{t("testimonialText")}”</p>
            <p className="text-right text-sm">{t("customer")}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Homepage: React.FC = () => (
  <>
    <Hero />
    <FeaturedCategories />
    <HowItWorks />
    <Testimonials />
  </>
);

export default Homepage;
