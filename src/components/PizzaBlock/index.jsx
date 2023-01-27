import React, { useState } from 'react';

const PizzaBlock = ({ title, price, imageUrl, sizes, types }) => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const typeNames = ['Thin', 'Traditional'];

  return (
    <div className="mb-16 text-center w-[280px]">
      <img className="w-[260px]" src={imageUrl} alt="Pizza" />
      <h4 className="font-black text-xl mb-5 tracking-[1%]">{title}</h4>
      <div className="flex bg-gray-200 flex-col p-[6px] rounded-[10px]">
        <ul className="flex flex-grow first-of-type:mb-[6px]">
          {types.map((type) => (
            <li
              onClick={() => setActiveType(type)}
              className={
                activeType === type || types.length < 2
                  ? 'bg-white rounded cursor-auto p-2 flex-1'
                  : 'cursor-pointer flex-grow flex-1  p-2'
              }
              key={type}>
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul className="flex flex-grow first-of-type:mb-[6px]">
          {sizes.map((size, index) => (
            <li
              onClick={() => setActiveSize(index)}
              className={
                activeSize === index
                  ? 'bg-white rounded flex-1 cursor-auto p-2'
                  : 'cursor-pointer flex-grow flex-1 p-2'
              }
              key={index}>
              {size} cm
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="font-bold text-xl leading-7">{price}$</div>
        <button className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add to cart</span>
          <i>0</i>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
