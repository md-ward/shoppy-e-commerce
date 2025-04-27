"use client";
import AnimatedSwitchingButton from "@/app/[locale]/(users)/components/AnimatedSwitchingButton";
import { Link } from "@/i18n/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRegistrationStore } from "../../state/registration.state";
import { useShallow } from "zustand/shallow";

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setUser, loginUser, error, user } = useRegistrationStore(
    useShallow((state) => ({
      user: state.user,
      error: state.error,
      setUser: state.setUser,
      loginUser: state.loginUser,
    })),
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        loginUser();
      }}
      className="border-accent bg-background flex !size-fit h-fit w-full max-w-xs flex-col gap-4 rounded-md border p-11 shadow **:[&_input]:shadow"
    >
      <div className="flex flex-col gap-1">
        {error && (
          <div className="text-sm font-medium text-red-500">{error}</div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium uppercase">
          Email
        </label>
        <input
          onChange={(e) => setUser({ email: e.target.value })}
          value={user?.email}
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          className="border-background dark:border-background-dark dark:bg-secondary-dark text-foreground dark:text-foreground-dark focus:ring-primary rounded-md border bg-white/60 px-4 py-2 focus:ring-2 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1 **:w-full">
        <label htmlFor="password" className="text-sm font-medium uppercase">
          Password
        </label>
        <span className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setUser({ password: e.target.value })}
            value={user?.password}
            name="password"
            id="password"
            className="border-background dark:border-background-dark dark:bg-secondary-dark text-foreground dark:text-foreground-dark focus:ring-primary relative rounded-md border bg-white/60 px-4 py-2 focus:ring-2 focus:outline-none"
          />

          <span className="dark:*:text-secondary *:text-foreground absolute right-1 flex h-full !w-fit items-center justify-center *:cursor-pointer">
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
        className="bg-primary dark:bg-accent-dark hover:bg-accent mt-4 w-full rounded-md py-2 font-semibold text-white transition-colors hover:cursor-pointer"
      >
        Login{" "}
      </button>

      <p className="text-foreground dark:text-foreground-dark text-sm">
        Forgot your password?{" "}
        <Link href="/forgot-password" className="text-accent hover:underline">
          Reset it
        </Link>
      </p>
    </form>
  );
};
