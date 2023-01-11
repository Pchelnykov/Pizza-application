import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const [pizza, setPizza] = useState<{imageUrl: string, title: string, price: number  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('https://639886ca044fa481d6a0dbc0.mockapi.io/pizza/' + id);
        setPizza(data);
      } catch (error) {
        alert('Произошла ошибка');
        navigate('/');
      }
    }
    fetchData();
  }, [id, navigate]);

  if (!pizza) {
    return <div>Загрузка ...</div>;
  }

  return (
    <div className='container fullpizza'>
      <img src={pizza.imageUrl} alt='pizza' />
      <h3>{pizza.title}</h3>
      <h4>{pizza.price} uah</h4>
    </div>
  );
};

export default FullPizza;
