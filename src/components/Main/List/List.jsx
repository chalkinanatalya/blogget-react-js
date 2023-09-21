import style from './List.module.css';
import {Post} from './Post/Post';

export const List = () => {
  const postData = {
    thumbnailUrl: '',
    title: 'Title',
    author: 'Nickname',
    ups: 24,
    date: '2023-08-24T09:45:00.000Z',
  };

  return (
    <ul className={style.list}>
      <Post postData={postData} />
    </ul>
  );
};
