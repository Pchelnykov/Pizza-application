import './scss/app.scss';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './components/FullPizza';
import MainLayouts from './components/layouts/MainLayouts';

function App() {
  return (
            <Routes>
              <Route path='/' element={<MainLayouts />}>
                <Route path='' element={<Home />}></Route>
                <Route path='cart' element={<Cart />}></Route>
                <Route path='pizza/:id' element={<FullPizza />}></Route>
                <Route path='*' element={<NotFound />}></Route>
              </Route>      
            </Routes>
          
  );
}

export default App;
