import {useContext} from 'react';
import {postsContext} from '../../../context/postContext';
import style from './List.module.css';
import {Post} from './Post/Post';

export const List = () => {
  const {posts, loading} = useContext(postsContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className={style.list}>
      {
        posts.map((postData) => <Post key={postData.id} postData={postData} />)
      }
    </ul>
  );
};

