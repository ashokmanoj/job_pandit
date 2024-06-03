import {create} from "zustand";

// Define a type for the slice state
interface IFilterState {
  location: string;
  education:string;
  gender: string;
  experience:string;
  english_fluency: string;
  skills:string[];
  

}

// Define the initial state using that type
const initialState: IFilterState = {
  location: "",
  education: "",
  gender: "",
  experience:"",
  english_fluency: "",
  skills:[],


  
};

interface IFilterActions {
  setLocation: (location: string) => void;
  setEducation:(education:string)=>void;
  setGender:(gender:string)=>void;
  setEnglishFluency: (english_fluency: string) => void;
  setExperience: (experience: string) => void;
  setSkills:(skill:string)=>void;
  resetFilter: () => void;
}

const useCandidateFilterStore = create<IFilterState & IFilterActions>((set) => ({
    ...initialState,
    setLocation: (location: string) =>
      set((state) => ({
        location: state.location === location ? "" : location,
      })),
    setEducation: (education: string) =>
      set((state) => ({
        education: state.education === education ? "" : education,
      })),
  
     setGender: (gender: string) =>
      set((state) => ({
        gender: state.gender === gender ? "" : gender,
      })),
    setEnglishFluency: (english_fluency: string) =>
      set((state) => ({
        english_fluency: state.english_fluency === english_fluency ? "" : english_fluency,
      })),
    setExperience: (experience: string) =>
        set((state) => ({
            experience: state.experience ===experience ? "" : experience,
          })),
    setSkills: (skill: string) =>
      set((state) => ({
        skills: state.skills.includes(skill)
          ? state.skills.filter((c) => c !== skill)
          : [...state.skills, skill],
      })),
    
    resetFilter: () =>
      set(() => ({
        ...initialState,
      })),
  }));

export default useCandidateFilterStore;
