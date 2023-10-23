import {useEffect, useRef} from 'react';
import style from './List.module.css';
import {Post} from './Post/Post';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPostsAsync} from '../../../store/postsData/postsAction';
import {Outlet, useParams} from 'react-router-dom';

export const List = () => {
  const postData = useSelector(state => state.posts.posts);
  const endList = useRef(null);
  const dispatch = useDispatch();
  const {page} = useParams();

  useEffect(() => {
    dispatch(fetchPostsAsync(page));
  }, [page]);

  const uniquePosts = [...new Map(postData.map(item => [item.data.id, item])).values()];

  useEffect(() => {
    if (!endList.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(fetchPostsAsync());
      }
    }, {
      rootMargin: '100px'
    });

    observer.observe(endList.current);
    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current]);

  return (
    <>
      <ul className={style.list}>
        {
          uniquePosts.map(({data}) => <Post key={data.id} postData={data} />)
        }
        <li ref={endList} className={style.end}/>
      </ul>
      <Outlet />
    </>
  );
};

