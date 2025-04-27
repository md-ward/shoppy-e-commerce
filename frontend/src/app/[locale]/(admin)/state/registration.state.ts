import axios from "axios";
import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface RegistrationStore {
  user: User | null;
  setUser: (user: Partial<User>) => void;
  loginUser: () => Promise<void>;
  signUpUser: (user: User) => void;
  logoutUser: () => void;
}

export const useRegistrationStore = create<RegistrationStore>((set, get) => ({
  user: null,

  setUser: (partialUser: Partial<User>) => {
    const currentUser = get().user || ({} as User);
    set({ user: { ...currentUser, ...partialUser } });
  },

  loginUser: async () => {
    const user = get().user;
    console.log({ user });

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      user,
      {
        withCredentials: true,
      },
    );
    if (response.data.message == "Login successful") {
      console.log("Login successful", response.data);

      window.location.href = "/admin";
    }
  },

  signUpUser: (user: User) => set({ user }),

  logoutUser: () => set({ user: null }),
}));
