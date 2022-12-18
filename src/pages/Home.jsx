import React from 'react';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home() {
  const [pizzaItems, setPizzaItems] = React.useState([]);
  const [isLoading, setIsLoadindg] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [changeSort, setChangeSort] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const onClickCategory = (index) => {
    setCategoryId(index);
  };

  React.useEffect(() => {
    setIsLoadindg(true);
    fetch(
      `https://639886ca044fa481d6a0dbc0.mockapi.io/pizza?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${changeSort.sortProperty.replace('-', '')}&order=${
        changeSort.sortProperty.includes('-') ? 'ask' : 'desc'
      }`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzaItems(arr);
        setIsLoadindg(false);
      });
  }, [categoryId, changeSort]);

  return (
    <>
      <div className='content__top'>
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort changeSort={changeSort} setChangeSort={setChangeSort} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzaItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </>
  );
}

export default Home;
