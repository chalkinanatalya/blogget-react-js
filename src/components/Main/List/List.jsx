import style from './List.module.css';
import {Post} from './Post/Post';

export const List = () => {
  const postsData = [
    {
      id: '34',
      thumbnailUrl: '',
      title: 'Title1',
      author: 'Nickname1',
      ups: 77,
      date: '2023-08-24T09:45:00.000Z',
    },

    {
      id: '45',
      thumbnailUrl: '',
      title: 'Title2',
      author: 'Nickname2',
      ups: 58,
      date: '2023-04-20T09:45:00.000Z',
    },

    {
      id: '67',
      thumbnailUrl: '',
      title: 'Title3',
      author: 'Nickname3',
      ups: 24,
      date: '2023-02-18T00:45:00.000Z',
    },

    {
      id: '78',
      thumbnailUrl: '',
      title: 'Title4',
      author: 'Nickname4',
      ups: 124,
      date: '2023-03-11T08:15:00.000Z',
    },
  ];

  return (
    <ul className={style.list}>
      {
        postsData.map((postData) => <Post key={postData.id} postData={postData} />)
      }
    </ul>
  );
};

