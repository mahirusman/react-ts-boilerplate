import React, { useEffect, useState } from 'react';
import LoginForm from '../../components/LogIn';
import { logindataTypes } from '../../types/auth';
import { useActions } from '../../actions';
import { useAppSelector } from '../../store';
import { selectUser } from './auth.selector';

function User() {
  const initalValues: logindataTypes = {
    email: '',
    password: '',
  };
  const user = useAppSelector(selectUser);
  const { userloginAction } = useActions();
  const [value, setvalue] = useState<any>('usman');

  const handleFormSubmit = (
    formValues: logindataTypes,
    { resetForm, setSubmitting }: any
  ) => {
    console.log('formValues ', formValues);

    const action = userloginAction(formValues);

    setSubmitting(false);

    resetForm();
  };

  return <LoginForm initalValues={initalValues} onSubmit={handleFormSubmit} />;
}

export default User;
