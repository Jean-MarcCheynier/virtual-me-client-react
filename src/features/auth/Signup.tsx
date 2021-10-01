import { useState } from 'react'

import { useAppDispatch } from '../../app/hooks';
import { signupAsync, /*signout*/ } from './authSlice';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';



function Signup(props: RouteComponentProps<{}, any, unknown> | any) {
  const [t] = useTranslation('common');
  const initialState = { login: '', password: '', passwordCheck: '' };
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ ...initialState});
  

  // const handleOnSignout = () => {
  //   dispatch(signout())
  // }
  
  
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    console.log(e);
    setForm({...initialState})
    dispatch(signupAsync(form))
  }
  
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  return <>
    <Form onSubmit={handleOnSubmit}>
      <Form.Group className="mb-1" controlId="login">
        <Form.Control
          onChange={handleOnChange}
          name='login'
          value={form.login}
          as="input"
          placeholder={t('signup.form.login.placeholder')}
          />
      </Form.Group>
      <Form.Group className="mb-1" controlId="password">
        <Form.Control
          onChange={handleOnChange}
          name='password'
          type='password'
          value={form.password}
          as="input"
          placeholder={t('signup.form.password.placeholder')}
        />
      </Form.Group>
      <Form.Group className="mb-1" controlId="password-check">
        <Form.Control
          onChange={handleOnChange}
          name='passwordCheck'
          type='password'
          value={form.passwordCheck}
          as="input"
          placeholder={t('signup.form.passwordCheck.placeholder')}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Button className="w-100" type="submit">{t('signup.form.submit.label')}</Button>
      </Form.Group>
    </Form>
    </>
}

export default Signup;
