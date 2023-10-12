import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {Provider} from 'react-redux';
import {AuthContextProvider} from './context/authContext';
import {PostsContextProvider} from './context/postContext';
import {store} from './store';

function App() {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <PostsContextProvider>
          <Header />
          <Main />
        </PostsContextProvider>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;
