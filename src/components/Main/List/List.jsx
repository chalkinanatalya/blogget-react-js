import {useEffect, useRef, useState} from 'react';
import style from './List.module.css';
import {Post} from './Post/Post';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useParams} from 'react-router-dom';
import {fetchPostsRequest} from '../../../store/postsData/postsSlice';
import {searchRequest} from '../../../store/search/saerchAction';

export const List = () => {
  const searchResults = useSelector(state => state.search.posts);
  const normalPosts = useSelector(state => state.posts.posts);
  const hasMoreData = useSelector(state => state.search.hasMoreData);
  const postData = searchResults.length ? searchResults : normalPosts;
  const endList = useRef(null);
  const dispatch = useDispatch();
  const {page} = useParams();

  const [autoLoadCount, setAutoLoadCount] = useState(1);
  const autoLoadCountRef = useRef(autoLoadCount);
  const searchQuery = useSelector(state => state.search.query);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchRequest(searchQuery));
    } else {
      dispatch(fetchPostsRequest(page));
    }
  }, [page, searchQuery]);

  useEffect(() => {
    autoLoadCountRef.current = autoLoadCount;
  }, [autoLoadCount]);

  const uniquePosts = [...new Map(postData.map(item => [item.data.id, item])).values()];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMoreData) {
        if (searchResults.length) {
          dispatch(searchRequest(searchQuery));
        } else {
          dispatch(fetchPostsRequest(page));
        }
        setAutoLoadCount(prev => prev + 1);
        if (autoLoadCountRef.current >= 3) {
          observer.unobserve(endList.current);
        }
      }
    }, {
      rootMargin: '100px'
    });

    if (hasMoreData) {
      observer.observe(endList.current);
    }
    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current, dispatch, hasMoreData]);

  return (
    <>
      <ul className={style.list}>
        {
          uniquePosts.map(({data}) => <Post key={data.id} postData={data} />)
        }
        <li ref={endList} className={style.end}/>
      </ul>
      {hasMoreData && autoLoadCountRef.current >= 4 && (
        <button
          className={style.loadMoreButton}
          onClick={() => {
            if (searchResults.length) {
              dispatch(searchRequest(searchQuery));
            } else {
              dispatch(fetchPostsRequest(page));
            }
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

