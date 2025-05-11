

import { categories } from "../../utils/constants";

const CategoryNavbar = ({onCategoryChange}) => {
  

  function handleClickBtn(cat){
    onCategoryChange(cat)
    
    console.log("category",cat)
  }
  return (
    <nav className="flex space-x-4 p-4 bg-white   justify-center shadow-sm">
      {categories.map((cat, i) => (
        <button
          key={i}
          className="px-4 py-2 bg-white rounded transition 
             text-black 
             hover:text-black hover:font-semibold 
             focus:text-[#8B5E3C] focus:font-extrabold"
          onClick={()=>handleClickBtn(cat)}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
};

export default CategoryNavbar;
// import { useState } from "react";
// import { categories } from "../../utils/constants";

// const CategoryNavbar = ({ onCategoryChange }) => {
//   const [activeCategory, setActiveCategory] = useState(null);

//   function handleClickBtn(cat) {
//     setActiveCategory(cat);
//     onCategoryChange(cat);
//     console.log("category", cat);
//   }

//   return (
//     <nav className="flex space-x-4 p-4 bg-white ">
//       {categories.map((cat, i) => (
//         <button
//           key={i}
//           className={`px-4 py-2 rounded transition 
//             ${
//               activeCategory === cat
//                 ? "bg-[#8B5E3C] text-white font-semibold"
//                 : "bg-white text-black hover:bg-[#8B5E3C] hover:text-white"
//             }`}
//           onClick={() => handleClickBtn(cat)}
//         >
//           {cat}
//         </button>
//       ))}
//     </nav>
//   );
// };

// export default CategoryNavbar;
