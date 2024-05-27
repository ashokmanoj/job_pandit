import useFilterStore from "@/lib/store/filter";
import React from "react";


const SearchFilter = () => {
const {setSearchKey} = useFilterStore((state) => state);

  // handle search 
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value)
  }
  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">Keyword or Title</div>
      <form className="input-box position-relative">
        <input onChange={handleSearch} type="text" placeholder="Search by Keywords" />
        <button>
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchFilter;
