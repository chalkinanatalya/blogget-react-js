import {useContext} from 'react';
import {postsContext} from '../../../context/postContext';
import style from './List.module.css';
import {Post} from './Post/Post';
import AuthLoader from '../../../UI/AuthLoader';

export const List = () => {
  const {posts, loading} = useContext(postsContext);

  if (loading) {
    return <AuthLoader />;
  }

  return (
    <ul className={style.list}>
      {
        posts.map((postData) => <Post key={postData.id} postData={postData} />)
      }
    </ul>
  );
};

