import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { useState } from "react";
import AnimatedSwitchingButton from "../AnimatedSwitchingButton";

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <form className="bg-gradient text-foreground dark:text-foreground-dark flex w-full max-w-3xl flex-col gap-4 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium uppercase">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your full name"
          className="border-background dark:border-background-dark dark:bg-secondary-dark text-foreground dark:text-foreground-dark focus:ring-primary rounded-md border bg-white/60 px-4 py-2 focus:ring-2 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium uppercase">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          className="border-background dark:border-background-dark dark:bg-secondary-dark text-foreground dark:text-foreground-dark focus:ring-primary rounded-md border bg-white/60 px-4 py-2 focus:ring-2 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium uppercase">
          Password
        </label>
        <span className="flex relative items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className="border-background dark:border-background-dark dark:bg-secondary-dark text-foreground dark:text-foreground-dark focus:ring-primary relative rounded-md border bg-white/60 px-4 py-2 focus:ring-2 focus:outline-none"
          />

          <span className="dark:*:text-secondary *:text-foreground  absolute right-1 flex h-full   items-center justify-center *:cursor-pointer">
            <AnimatedSwitchingButton
              isEditable={showPassword}
              key={showPassword ? "eye" : "eye-off"}
              onSwitch={() => setShowPassword(!showPassword)}
              FirstIcon={<Eye />}
              SecondIcon={<EyeOff />}
            />
          </span>
        </span>
      </div>

      <button
        type="submit"
        className="bg-primary dark:bg-accent-dark hover:bg-accent mt-4 rounded-md py-2 font-semibold text-white transition-colors hover:cursor-pointer"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
