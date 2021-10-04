import { useAppDispatch } from '../../app/hooks';
import { signupAsync, /*signout*/ } from './authSlice';
import { Form as BForm } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { Formik, FormikHelpers, FormikProps, Form } from 'formik';
import * as Yup from 'yup';
import FormikFieldControl from '../../components/custom/formik/FormikFieldControl';


interface Values {
  login: string;
  password: string;
  passwordCheck: string;
}

const SignupSchema = Yup.object().shape({
  login: Yup.string()
    .required('signup.form.login.error.required'),
  password: Yup.string()
    .min(4, 'signup.form.password.error.tooShort')
    .required('signup.form.password.error.required'),
  passwordCheck: Yup.string()
    .required('signup.form.passwordCheck.error.required')
    .oneOf([Yup.ref('password'), null], 'signup.form.passwordCheck.error.dontMatch')
});


function Signup(props: RouteComponentProps<{}, any, unknown> | any) {
  const [t] = useTranslation('common');
  const initialValues: Values = { login: '', password: '', passwordCheck: '' };
  const dispatch = useAppDispatch();

  const handleOnSubmit = (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    const res = dispatch(signupAsync(values));
    res.then(a => {
      setSubmitting(false);
    })
  }

  return <>
    <Formik
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
      validationSchema={SignupSchema}
    >
      {({ isSubmitting, errors, touched, isValid }: FormikProps<Values>) => (
        <Form>
          <FormikFieldControl errors={errors} touched={touched} name="login" placeholder={t('signup.form.login.placeholder')} />
          <FormikFieldControl errors={errors} touched={touched} type="password" name="password" placeholder={t('signup.form.password.placeholder')} />
          <FormikFieldControl errors={errors} touched={touched} type="password" name="passwordCheck" placeholder={t('signup.form.passwordCheck.placeholder')} />
          <BForm.Group controlId="password">
            <Button className="w-100" type="submit" disabled={isSubmitting || !isValid}>{t('signup.form.submit.label')}</Button>
          </BForm.Group>
        </Form>)}
    </Formik>
  </>
} 

export default Signup;
