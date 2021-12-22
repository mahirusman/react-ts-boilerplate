import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './General/ErrorBoundary/Index';
import { ErrorHanlder } from './utils/ErrorHanlder';
import { setloader } from './container/Loader/loader.slice';

axios.interceptors.request.use(
  function (req) {
    store.dispatch(setloader(true));
    return req;
  },
  function (err) {
    store.dispatch(setloader(false));
    return new ErrorHanlder(err);
    // return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  function (res) {
    store.dispatch(setloader(false));
    return res.data;
  },
  function (err) {
    store.dispatch(setloader(false));
    return new ErrorHanlder(err);
    // return Promise.reject(err);
  }
);

ReactDOM.render(
  <ErrorBoundary>
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  </ErrorBoundary>,
  document.getElementById('root')
);

export { axios };
// exporting axios to use it in base service
