import { Outlet } from 'react-router-dom';
import Header from './pages/Global/Header/Header';
import Sidebar from './pages/Global/Sidebar/Sidebar';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
};
export default App;
