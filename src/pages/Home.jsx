import React from 'react';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { setCategoryId } from '../Redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { AppContext } from '../App';
import Pagination from '../components/Pagination';

function Home() {
  const [pizzaItems, setPizzaItems] = React.useState([]);
  const [isLoading, setIsLoadindg] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const changeSort = useSelector((state) => state.filterSlice.sort);

  const onChangeCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };

  const { searchValue } = React.useContext(AppContext);

  React.useEffect(() => {
    setIsLoadindg(true);

    axios
      .get(
        `https://639886ca044fa481d6a0dbc0.mockapi.io/pizza?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${changeSort.sortProperty.replace('-', '')}&order=${
          changeSort.sortProperty.includes('-') ? 'ask' : 'desc'
        }`,
      )
      .then((res) => {
        setPizzaItems(res.data);
        setIsLoadindg(false);
      });
  }, [categoryId, changeSort, searchValue, currentPage]);

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
