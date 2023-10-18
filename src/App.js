import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {useDispatch} from 'react-redux';
import {PostsContextProvider} from './context/postContext';
import {getToken} from './api/token';
import {updateToken} from './store/tokenReducer';


function App() {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));
  return (
    <PostsContextProvider>
      <Header />
      <Main />
    </PostsContextProvider>
  );
}

export default App;
