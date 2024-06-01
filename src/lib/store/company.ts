import {create} from "zustand";

// Define a type for the slice state
interface IFilterState {
  location: string;
  search_key: string;
  category: string;
  company_type:string
}

// Define the initial state using that type
const initialState: IFilterState = {
  location: "",
  search_key: "",
  category: "",
  company_type:""
};

interface IFilterActions {
  setLocation: (location: string) => void;
  setSearchKey: (search_key: string) => void;
  setCategory: (category: string) => void;
  setCompanyType: (company_type: string) => void;
  resetFilter: () => void;
}

const useCompanyFilterStore = create<IFilterState & IFilterActions>((set) => ({
  ...initialState,
  setLocation: (location: string) =>
    set((state) => ({
      location: state.location === location ? "" : location,
    })),
  setSearchKey: (search_key: string) =>
    set(() => ({
      search_key,
    })),
  setCategory: (category: string) =>
    set((state) => ({
      category: state.category === category ? "" : category,
    })),
  setCompanyType: (company_type: string) =>
    set((state) => ({
      company_type: state.company_type === company_type ? "" : company_type,
    })),
  resetFilter: () => set(() => initialState),
}));

export default useCompanyFilterStore;
