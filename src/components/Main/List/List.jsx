import {useEffect, useRef, useState} from 'react';
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

  const [autoLoadCount, setAutoLoadCount] = useState(1);
  const autoLoadCountRef = useRef(autoLoadCount);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [page]);

  useEffect(() => {
    autoLoadCountRef.current = autoLoadCount;
  }, [autoLoadCount]);

  const uniquePosts = [...new Map(postData.map(item => [item.data.id, item])).values()];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(fetchPostsAsync());
        setAutoLoadCount(prev => prev + 1);
        if (autoLoadCountRef.current >= 3) {
          observer.unobserve(endList.current);
        }
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
  }, [endList.current, dispatch]);

  return (
    <>
      <ul className={style.list}>
        {
          uniquePosts.map(({data}) => <Post key={data.id} postData={data} />)
        }
        <li ref={endList} className={style.end}/>
      </ul>
      {autoLoadCountRef.current >= 4 && (
        <button
          className={style.loadMoreButton}
          onClick={() => {
            dispatch(fetchPostsAsync());
            setAutoLoadCount(prev => prev + 1);
          }}
        >
          Загрузить еще
        </button>
      )}
      <Outlet />
    </>
  );
};

