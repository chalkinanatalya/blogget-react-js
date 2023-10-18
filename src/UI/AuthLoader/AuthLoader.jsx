import RingLoader from 'react-spinners/RingLoader';
import style from './AuthLoader.module.css';

export const AuthLoader = () => (
  <div className={style.container}>
    <RingLoader color='#cc6633' css={{display: 'block'}} size={30}/>
  </div>
);
