import { mosque } from "@/db/schema/app.sql";
import { user } from "@/db/schema/auth.sql";
import "client-only";
import { create } from "zustand";

type GlobalStoreData = {
  registerFormStep: number;
  setRegisterFormStep: (step: number) => void;
  editSheikhFormOpen: boolean;
  setEditSheikhFormOpen: (state: boolean) => void;
  editSheikhData: Partial<typeof user.$inferInsert> | null;
  setEditSheikhData: (
    data: Partial<typeof user.$inferInsert>
  ) => void;
  editMosqueData: Partial<typeof mosque.$inferInsert> | null;
  setEditMosqueData: (
    state: Partial<typeof mosque.$inferInsert>
  ) => void;
  editMosqueFormOpen: boolean;
  setEditMosqueFormOpen: (state: boolean) => void;
};

export const useGlobalStore = create<GlobalStoreData>()((set) => ({
  registerFormStep: 1,
  setRegisterFormStep: (step) =>
    set({ registerFormStep: step }),
  editSheikhFormOpen: false,
  setEditSheikhFormOpen: (state) =>
    set({ editSheikhFormOpen: state }),
  editSheikhData: null,
  setEditSheikhData: (data) => set({ editSheikhData: data }),
  editMosqueData: null,
  setEditMosqueData: (data) => set({ editMosqueData: data }),
  editMosqueFormOpen: false,
  setEditMosqueFormOpen: (state) =>
    set({ editMosqueFormOpen: state }),
}));
