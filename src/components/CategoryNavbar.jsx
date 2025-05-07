// components/CategoryNavbar.js

import { categories } from "../utils/constants";

const CategoryNavbar = ({onCategoryChange}) => {
  
  function handleClickBtn(cat){
    onCategoryChange(cat)
    console.log("category",cat)
  }
  return (
    <nav className="flex space-x-4 p-4 bg-gray-100">
      {categories.map((cat, i) => (
        <button
          key={i}
          className="px-4 py-2 bg-white rounded hover:bg-pink-100 transition"
          onClick={()=>handleClickBtn(cat)}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
};

export default CategoryNavbar;
