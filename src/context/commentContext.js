import React from 'react';
import PropTypes from 'prop-types';

export const commentContext = React.createContext({});

export const CommentContextProvider = ({children}) => {
  const [value, setValue] = React.useState('');
  return (
    <commentContext.Provider value={{value, setValue}}>
      {children}
    </commentContext.Provider>
  );
};

CommentContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
