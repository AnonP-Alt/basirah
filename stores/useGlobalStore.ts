import "client-only";
import { create } from "zustand";

type GlobalStoreData = {
  registerFormStep: number;
  setRegisterFormStep: (step: number) => void;
};

export const useGlobalStore = create<GlobalStoreData>()(
  (set) => ({
    registerFormStep: 1,
    setRegisterFormStep: (step) =>
      set({ registerFormStep: step }),
  })
);
