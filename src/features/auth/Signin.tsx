import { useState } from 'react'

import { useAppDispatch } from '../../app/hooks';
import { signinAsync, signout } from './authSlice';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next';



function Signin() {
  const [t] = useTranslation('common');
  const initialState = { login: '', password: '' };
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ ...initialState});
  

  const handleOnSignout = () => {
    dispatch(signout())
  }
  
  
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    console.log(e);
    setForm({...initialState})
    dispatch(signinAsync(form))
  }
  
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  return <>
    <Form className="m-2" onSubmit={handleOnSubmit}>
      <Form.Group className="mb-1" controlId="login">
        <Form.Control
          onChange={handleOnChange}
          name='login'
          value={form.login}
          as="input"
          placeholder={t('signin.form.login.placeholder')}
          />
      </Form.Group>
      <Form.Group className="mb-1" controlId="password">
        <Form.Control
          onChange={handleOnChange}
          name='password'
          type='password'
          value={form.password}
          as="input"
          placeholder={t('signin.form.password.placeholder')}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Button className="w-100" type="submit">{t('signin.form.submit.label')}</Button>
      </Form.Group>
    </Form>
    </>
}

export default Signin;
