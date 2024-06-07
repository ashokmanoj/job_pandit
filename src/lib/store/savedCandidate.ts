import { create } from "zustand";
import { persist } from "zustand/middleware";
import { notifyError, notifySuccess } from "@/utils/toast";

interface SavedCandidateStore {
  savedCandidates: any[] ;
  add_to_list: (data: any) => void;
  remove_from_list: (data: any) => void;
  reset: () => void;
}


const useSavedCandidateStore = create<SavedCandidateStore>()(
  persist(
    (set) => ({
      savedCandidates: [],
      add_to_list: (data: any) => set((state) => {
        const isExist = state.savedCandidates.some((item) => item.id === data.id);
        let updatedList;
        if (!isExist) {
          updatedList = [...state.savedCandidates, data];
          notifySuccess(`${data.name} added to list`);
        } else {
          updatedList = state.savedCandidates.filter((item) => item.id !== data.id);
          notifyError(`${data.name} removed from list`);
        }
        return { savedCandidates: updatedList };
      }),
      remove_from_list: (data: any) => set((state) => {
        const updatedList = state.savedCandidates.filter((item) => item.id !== data.id);
        notifyError(`${data.name} removed from list`);
        return { savedCandidates: updatedList };
      }),
      reset: () => set((state) => {
        return { savedCandidates: [] };
      })
    }),
    { name: "saved_candidate" }
  )
);

export default useSavedCandidateStore;
