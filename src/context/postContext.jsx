import React from 'react';
import {useBestPosts} from '../hooks/useBestPosts';
import PropTypes from 'prop-types';

export const postsContext = React.createContext({});

export const PostsContextProvider = ({children}) => {
  const {posts, loading} = useBestPosts();

  return (
    <postsContext.Provider value={{posts, loading}}>
      {children}
    </postsContext.Provider>
  );
};

PostsContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
