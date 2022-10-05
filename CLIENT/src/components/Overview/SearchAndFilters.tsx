import React from "react";
import { FaFilter, FaSearch } from "react-icons/fa";

const SearchAndFilters = () => {
  return (
    <div className="my-6 flex">
      <SearchBar />
      <FilterButton />
    </div>
  );
};

export default SearchAndFilters;

const SearchBar = () => {
  return (
    <div className="relative w-11/12 mr-2">
      <input
        type="text"
        className="shadow-sm border-2 pl-11 border-zinc-200 text-lg p-1 rounded-md w-full bg-transparent"
        placeholder="Protein Pancakes"
      />
      <FaSearch className="text-xl text-zinc absolute center left-6 text-purple-600" />
    </div>
  );
};

const FilterButton = () => {
  return (
    <div className="bg-purple-200 text-2xl flex items-center justify-center rounded-md flex-1 shadow-sm text-purple-600 hover:shadow-md cursor-pointer">
      <FaFilter />
    </div>
  );
};
