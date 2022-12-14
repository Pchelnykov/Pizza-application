import React from 'react';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home() {
  const [pizzaItems, setPizzaItems] = React.useState([]);
  const [isLoading, setIsLoadindg] = React.useState(true);

  React.useEffect(() => {
    setIsLoadindg(true);
    fetch('https://639886ca044fa481d6a0dbc0.mockapi.io/pizza')
      .then((res) => res.json())
      .then((arr) => {
        setPizzaItems(arr);
        setIsLoadindg(false);
      });
  }, []);

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
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