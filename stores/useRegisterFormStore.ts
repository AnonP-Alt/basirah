import "client-only";
import { create } from "zustand";

type RegisterFormStoreData = {
  name: string;
  setName: (name: string) => void;
  nationalId: string;
  setNationalId: (id: string) => void;
  address: string;
  setAddress: (address: string) => void;
};

export const useRegisterFormStore =
  create<RegisterFormStoreData>()((set) => ({
    name: "",
    setName: (name) => set({ name }),
    nationalId: "",
    setNationalId: (id) => set({ nationalId: id }),
    address: "",
    setAddress: (address) => set({ address }),
  }));
