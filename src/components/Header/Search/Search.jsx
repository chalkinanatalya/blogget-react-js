import {useDispatch} from 'react-redux';
import style from './Search.module.css';
import {ReactComponent as SearchIcon} from './img/search.svg';
import {useState} from 'react';
import {searchRequest} from '../../../store/search/saerchAction';

export const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const handlerSubmit = e => {
    e.preventDefault();
    dispatch(searchRequest(search));
  };

  return (
    <form className={style.form} onSubmit={handlerSubmit}>
      <input
        className={style.search}
        type="search"
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <button className={style.button} type='submit'>
        <SearchIcon className={style.svg}/>
      </button>
    </form>
  );
};
