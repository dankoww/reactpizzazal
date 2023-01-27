import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';

import { SearchContext } from '../App';
import Categories, { categories } from '../components/Categories';
import Pagination from '../components/pagination';
import PizzaBlock from '../components/PizzaBlock/';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortValues } from '../components/Sort';

const Home = () => {
  const navigate = useNavigate();

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const search = searchValue ? `&search=${searchValue}` : '';

  const fetchPizza = () => {
    setIsLoading(true);
    axios
      .get(
        `https://62d53c43d4406e5235560553.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType}${search}`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortValues.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizza();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div className="my-0 mx-auto w-[90%]">
      <div className="flex items-center justify-between">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => {
            dispatch(setCategoryId(i));
            dispatch(setCurrentPage(1));
          }}
        />
        <Sort />
      </div>
      <h2 className="font-extrabold mx-0 my-8 text-center">{categories[categoryId]} pizza</h2>
      <div className="grid justify-items-center grid-cols-items-cols">
        {isLoading ? [...new Array(4)].map((_, index) => <Skeleton key={index} />) : pizzas}
      </div>
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
