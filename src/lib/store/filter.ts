import {create} from "zustand";

// Define a type for the slice state
interface IFilterState {
  location: string;
  search_key: string;
  job_type: string;
  english_fluency: string;
  experience: string[];
  category: string[];
  tags: string[];
}

// Define the initial state using that type
const initialState: IFilterState = {
  location: "",
  search_key: "",
  job_type: "",
  english_fluency: "",
  experience: [],
  category: [],
  tags: [],
};

interface IFilterActions {
  setLocation: (location: string) => void;
  setJobType: (job_type: string) => void;
  setSearchKey: (search_key: string) => void;
  setEnglishFluency: (english_fluency: string) => void;
  setExperience: (experience: string) => void;
  setCategory: (category: string) => void;
  setTags: (tags: string) => void;
  resetFilter: () => void;
}

const useFilterStore = create<IFilterState & IFilterActions>((set) => ({
  ...initialState,
  setLocation: (location: string) =>
    set((state) => ({
      location: state.location === location ? "" : location,
    })),
  setJobType: (job_type: string) =>
    set((state) => ({
      job_type: state.job_type === job_type ? "" : job_type,
    })),
  setSearchKey: (search_key: string) =>
    set(() => ({
      search_key,
    })),
  setEnglishFluency: (english_fluency: string) =>
    set((state) => ({
      english_fluency: state.english_fluency === english_fluency ? "" : english_fluency,
    })),
  setExperience: (experience: string) =>
    set((state) => ({
      experience: state.experience.includes(experience)
        ? state.experience.filter((e) => e !== experience)
        : [...state.experience, experience],
    })),
  setCategory: (category: string) =>
    set((state) => ({
      category: state.category.includes(category)
        ? state.category.filter((c) => c !== category)
        : [...state.category, category],
    })),
  setTags: (tags: string) =>
    set((state) => ({
      tags: state.tags.includes(tags)
        ? state.tags.filter((t) => t !== tags)
        : [...state.tags, tags],
    })),
  resetFilter: () =>
    set(() => ({
      ...initialState,
    })),
}));

export default useFilterStore;
