import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {AuthContextProvider} from './context/authContext';
import {PostsContextProvider} from './context/postContext';
import {TokenContextProvider} from './context/tokenContext';

function App() {
  return (
    <TokenContextProvider>
      <AuthContextProvider>
        <PostsContextProvider>
          <Header />
          <Main />
        </PostsContextProvider>
      </AuthContextProvider>
    </TokenContextProvider>
  );
}

export default App;
