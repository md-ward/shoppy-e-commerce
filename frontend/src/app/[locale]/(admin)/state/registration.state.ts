import axios from "axios";
import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface RegistrationStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: Partial<User>) => void;
  loginUser: () => Promise<void>;
  signUpUser: (user: User) => void;
  logoutUser: () => void;
  error: string | null;
}

export const useRegistrationStore = create<RegistrationStore>((set, get) => ({
  user: null,
  error: null,
  isLoading: false,

  setUser: (partialUser: Partial<User>) => {
    const currentUser = get().user || ({} as User);
    set({ user: { ...currentUser, ...partialUser } });
  },

  loginUser: async () => {
    try {
      set({ isLoading: true });
      const user = get().user;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        user,
        {
          withCredentials: true,
        },
      );
      if (response.data.message == "Login successful") {
        set({ isLoading: false });
        console.log("Login successful", response.data);

        window.location.href = "/admin";
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login failed", error.response.data.message);
      set({ error: error.response.data.message });
      setTimeout(() => {
        set({ error: null, isLoading: false });
      }, 2000);
    }
  },

  signUpUser: (user: User) => set({ user }),

  logoutUser: () => set({ user: null }),
}));
