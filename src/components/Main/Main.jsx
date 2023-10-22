import {Route, Routes} from 'react-router-dom';
import {Layout} from '../Layout/Layout';
import {List} from './List/List';
import style from './Main.module.css';
import {Tabs} from './Tabs/Tabs';
import Modal from '../Modal';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Tabs />
      <Routes>
        <Route path='category/:page' element={<List />}>
          <Route path='post/:id' element={<Modal />} />
        </Route>
      </Routes>
    </Layout>
  </main>
);
