import React from 'react';
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './General/views/Loader';
import { useAppSelector } from './store';
import { selecloader } from './container/Loader/loader.selector';

const App = () => {
  const loader = useAppSelector(selecloader);

  return (
    <div>
      <ToastContainer position="top-right" />
      <Routes />
      <Loader display={loader} />
    </div>
  );
};

export default App;
