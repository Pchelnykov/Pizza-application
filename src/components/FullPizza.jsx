import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('https://639886ca044fa481d6a0dbc0.mockapi.io/pizza/' + id);
        setPizza(data);
      } catch (error) {
        alert('Произошла ошибка');
      }
    }
    fetchData();
  }, [id]);

  if (!pizza) {
    return <div>Загрузка ...</div>;
  }

  return (
    <div className='container'>
      <img src={pizza.imgUrl} alt='pizza' />
      <h3>{pizza.title}</h3>
      <h4>{pizza.price} uah</h4>
    </div>
  );
};

export default FullPizza;
