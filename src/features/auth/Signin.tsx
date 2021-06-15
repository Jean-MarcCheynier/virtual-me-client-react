import { useState } from 'react'

import { useAppDispatch } from '../../app/hooks';
import { signinAsync, signout } from './authSlice';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Signin() {
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
    <Form onSubmit={handleOnSubmit}>
      <Form.Control
        onChange={handleOnChange}
        name='login'
        value={form.login}
        as="input"
        placeholder="login"
      />
      <Form.Control
        onChange={handleOnChange}
        name='password'
        value={form.password}
        as="input"
        placeholder="password"
      />
      <Button type="submit">submit</Button>
      
    </Form>
    <Button type="button" onClick={handleOnSignout}>Signout</Button>
    </>
}

export default Signin;
