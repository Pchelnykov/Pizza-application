import React from 'react';
import Sort, { sortList } from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { setCategoryId, setFilters } from '../Redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import Pagination from '../components/Pagination';
import { setItems } from '../Redux/slices/pizzaSlice';

function Home() {
  const navigate = useNavigate();
  // const [pizzaItems, setPizzaItems] = React.useState([]);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const [isLoading, setIsLoadindg] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const changeSort = useSelector((state) => state.filterSlice.sort);
  const pizzaItems = useSelector((state) => state.pizza.items);
  const { searchValue } = React.useContext(AppContext);

  const onChangeCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };

  const fetchPizzas = async () => {
    setIsLoadindg(true);

    try {
      const { data } = await axios.get(
        `https://639886ca044fa481d6a0dbc0.mockapi.io/pizza?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${changeSort.sortProperty.replace('-', '')}&order=${
          changeSort.sortProperty.includes('-') ? 'ask' : 'desc'
        }`,
      );
      dispatch(setItems(data));
    } catch (error) {
      console.log(error, 'ERROR');
    } finally {
      setIsLoadindg(false);
    }
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

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

  const pizzas = pizzaItems
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <>
      <div className='content__top'>
        <Categories categoryId={categoryId} onClickCategory={onChangeCategoryId} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
}

export default Home;
