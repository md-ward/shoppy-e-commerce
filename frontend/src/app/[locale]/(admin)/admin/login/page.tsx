import { Login } from "@/app/[locale]/(admin)/components/Registeration/login";
import Image from "next/image";

const Page = () => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center gap-2 *:!shadow-black [&_form]:z-50">
      <div className="flex-1 max-sm:absolute top-0">
        <Image
          src={"/character.svg"}
          alt="character"
          width={200}
          height={200}
          className="h-full w-full object-scale-down"
        />
      </div>
      <div className="flex  flex-1 flex-col items-center gap-4 drop-shadow-2xl transition-all duration-150 ease-in-out select-none">
        <h3 className="text-accent text-2xl font-bold">Admin Login</h3>
        <Login />
      </div>
      <div className="pattern absolute inset-0 -z-10"></div>
    </div>
  );
};

export default Page;
