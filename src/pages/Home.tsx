import React from 'react';
import Sort, { sortList } from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import {
  FilterSliceState,
  selectSort,
  setCategoryId,
  setFilters,
} from '../Redux/slices/filterSlice';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { fetchPizzasStatus, selectPizzaData } from '../Redux/slices/pizzaSlice';
import { useAppDispatch } from '../Redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const dispatch = useAppDispatch();
  const categoryId = useSelector((state: any) => state.filterSlice.categoryId);
  const changeSort = useSelector(selectSort);
  const searchValue = useSelector((state: any) => state.filterSlice.searchValue);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategoryId = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const fetchPizzas = async () => {
    const sortBy = changeSort.sortProperty.replace('-', '');
    const order = changeSort.sortProperty.includes('-') ? 'ask' : 'desc';
    dispatch(
      // @ts-ignore
      fetchPizzasStatus({
        currentPage,
        order,
        categoryId,
        sortBy,
      }),
    );
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params: FilterSliceState = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, changeSort, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: changeSort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, changeSort]);

  const pizzas = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => <PizzaBlock {...obj} />);

  const skeletons = [...Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories categoryId={categoryId} onClickCategory={onChangeCategoryId} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h3>Произошла ошибка</h3>
          <p>Попробуйте повторить запрос позже...</p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination onChangePage={(number: number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
