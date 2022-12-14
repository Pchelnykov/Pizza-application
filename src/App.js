import React from 'react';
import Header from './components/Header';
import Sort from './components/Sort';
import Categories from './components/Categories';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import './scss/app.scss';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Skeleton from './components/PizzaBlock/Skeleton';

function App() {
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
    <div className='App'>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <div className='content__top'>
              <Routes>
                <Route path='/' element={<Home />}></Route>
              </Routes>
              <Categories />
              <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
              {isLoading
                ? [...Array(6)].map((_, i) => <Skeleton />)
                : pizzaItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
