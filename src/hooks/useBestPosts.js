import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPostsAsync} from '../store/postsData/postsAction';

export const useBestPosts = () => {
  const posts = useSelector(state => state.posts.posts);
  const loading = useSelector(state => state.posts.loading);
  const token = useSelector(state => state.token.token);
  const error = useSelector(state => state.posts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    dispatch(fetchPostsAsync());
  }, [token, dispatch]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching posts:', error);
    }
  }, [error]);

  return {posts, loading};
};
