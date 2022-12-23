import React from 'react';
import styles from './Search.module.scss';
import { AppContext } from '../../App';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(AppContext);
  return (
    <div className='root'>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        type='text'
        placeholder='Введите поисковый запрос ...'
      />
    </div>
  );
};

export default Search;
