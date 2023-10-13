export const setToken = (token) => {
  if (token) {
    localStorage.setItem('bearer', token);
  } else {
    localStorage.removeItem('bearer');
  }
};

export const getToken = () => {
  if (location.pathname.includes('/auth')) {
    const token = new URLSearchParams(location.hash.substring(1)).get('access_token');
    if (token) {
      setToken(token);
      window.history.replaceState({}, document.title, '/auth');
      return token;
    }
  }

  return localStorage.getItem('bearer');
};


