import React from 'react';
import Header from './components/Header';
import './scss/app.scss';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
export const AppContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <AppContext.Provider value={{ searchValue, setSearchValue }}>
      <div className='App'>
        <div className='wrapper'>
          <Header />
          <div className='content'>
            <div className='container'>
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='*' element={<NotFound />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
