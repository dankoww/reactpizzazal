import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice';

export const sortValues = [
  { name: 'Popularity', sortProperty: 'rating' },
  { name: 'Price', sortProperty: 'price' },
  { name: 'Name', sortProperty: 'title' }
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  const sortRef = useRef();

  const [isVisible, setIsVisible] = useState(false);

  const SelectedValueToggler = (obj) => {
    dispatch(setSort(obj));
    setIsVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="relative">
      <div className="flex items-center">
        <svg
          className="mr-[8px]"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b className="mr-[8px]">Sort by:</b>
        <span
          className="cursor-pointer text-orange-600 border-b-[1px] border-dashed border-orange-600"
          onClick={() => {
            setIsVisible((isVisible) => !isVisible);
          }}>
          {sort.name}
        </span>
      </div>
      {isVisible && (
        <div className="bg-white mt-4 overflow-hidden px-0 py-2 absolute right-0 w-40 rounded-[10px] shadow-sm shadow-gray-700/90 border-black">
          <ul className="overflow-hidden">
            {sortValues.map((obj, index) => (
              <li
                className={
                  sort.sortProperty === obj.sortProperty
                    ? 'bg-gray-700/50 py-3 px-5 cursor-pointer'
                    : 'py-3 px-5 cursor-pointer hover:bg-gray-700/30'
                }
                onClick={() => SelectedValueToggler(obj)}
                key={index}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
