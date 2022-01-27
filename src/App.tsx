import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './General/views/Loader';
import { useAppSelector } from './store';
import { selecloader } from './container/Loader/loader.selector';
import { selectUser } from './container/auth/auth.selector';
import AuthenticatedApp from './Routes/AuthenticatedApp';
import UnauthenticatedApp from './Routes/UnauthenticatedApp';

const App: React.FC = () => {
  const loader = useAppSelector(selecloader);
  const User = useAppSelector(selectUser);

  return (
    <div>
      <ToastContainer position="top-right" />
      {User?.token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      <Loader display={loader} />
    </div>
  );
};

export default App;
