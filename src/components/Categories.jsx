import React from 'react';
const categories = ['Мясные', 'Вегетерианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories() {
  const [activeButton, setActiveButton] = React.useState(0);
  const onClickCategory = (index) => {
    setActiveButton(index);
  };
  return (
    <div className='categories'>
      <ul>
        {categories.map((value, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={activeButton === i ? 'active' : ''}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
