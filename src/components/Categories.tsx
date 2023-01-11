import React from 'react';
const categories = ['Все', 'Мясные', 'Вегетерианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (idx: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({ categoryId, onClickCategory }) => {
  return (
    <div className='categories'>
      <ul>
        {categories.map((value, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={categoryId === i ? 'active' : ''}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
