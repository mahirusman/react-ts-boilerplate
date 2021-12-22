import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { memo } from 'react';

const Login = React.lazy(() => import('../container/auth/Login'));

const RoutesPage = memo(() => {
  return (
    <>
      <Suspense fallback="Loading......">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="*"
            element={() => {
              return <div>Page not found</div>;
            }}
          />
        </Routes>
      </Suspense>
    </>
  );
});

export default RoutesPage;
