import React from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../Redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1500),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.search__icon}
        enableBackground='new 0 0 70 70'
        height='70px'
        id='Icons'
        version='1.1'
        viewBox='0 0 70 70'
        width='70px'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M51.957,49.129l-8.713-8.713c1.75-2.337,2.799-5.229,2.799-8.373c0-7.732-6.268-14-14-14s-14,6.268-14,14s6.268,14,14,14  c3.144,0,6.036-1.049,8.373-2.799l8.713,8.713L51.957,49.129z M22.043,32.043c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10  c0,5.514-4.486,10-10,10C26.529,42.043,22.043,37.557,22.043,32.043z' />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type='text'
        placeholder='Введите поисковый запрос ...'
      />
      {value && (
        <svg
          className={styles.icon}
          onClick={onClickClear}
          height='512px'
          id='Layer_1'
          version='1.1'
          viewBox='0 0 512 512'
          width='512px'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z' />
        </svg>
      )}
    </div>
  );
};

export default Search;
