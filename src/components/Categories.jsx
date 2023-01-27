import React from 'react';
export const categories = ['All', 'Meaty', 'Vegeterian', 'Grilled', 'Spicy', 'Folded'];
const Categories = ({ value, onChangeCategory }) => {
  return (
    <div className="">
      <ul className="flex flex-wrap justify-center">
        {categories.map((category, index) => {
          return (
            <li
              onClick={() => onChangeCategory(index)}
              className={
                value === index
                  ? 'bg-black py-[12px] px-[30px] mr-[10px] font-bold text-white cursor-pointer rounded-[30px]'
                  : 'bg-gray-100 py-[12px] px-[30px] mr-[10px] font-bold cursor-pointer rounded-[30px] hover:bg-gray-300'
              }
              key={index}>
              {category}
            </li>
          );
        })}

        {/* <li onClick={() => onClickCategoryHandler(0)} className={activeIndex === 0 ? 'active' : ''}>
          All
        </li> */}
      </ul>
    </div>
  );
};

export default Categories;
