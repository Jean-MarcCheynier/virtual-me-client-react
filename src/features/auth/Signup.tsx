import { useAppDispatch } from '../../app/hooks';
import { signinAsync, signupAsync, /*signout*/ } from './authSlice';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import FormikFieldControl from '../../components/custom/formik/FormikFieldControl';
import { connect } from 'react-redux';


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


function Signup(props: RouteComponentProps<{status: string}, any, unknown> | any) {
  const [t] = useTranslation('common');
  const initialValues: Values = { login: '', password: '', passwordCheck: '' };
  const dispatch = useAppDispatch();
  const { status, error } = props;

  const handleOnSubmit = (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    dispatch(signupAsync(values))
      .unwrap()
      .then((originalPromiseResult) => {
        alert("then");
        setSubmitting(false)
        dispatch(signinAsync({ login: values.login, password: values.password }))
      })
      .catch((rejectedValueOrSerializedError) => { setSubmitting(false) });
  }

  return <>
    <Formik
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
      validationSchema={SignupSchema}
    >
      {({ handleSubmit, isSubmitting, errors, touched, isValid }: FormikProps<Values>) => (
        <Form noValidate onSubmit={handleSubmit}>
          <FormikFieldControl errors={errors} touched={touched} name="login" placeholder={t('signup.form.login.placeholder')} />
          <FormikFieldControl errors={errors} touched={touched} type="password" name="password" placeholder={t('signup.form.password.placeholder')} />
          <FormikFieldControl errors={errors} touched={touched} type="password" name="passwordCheck" placeholder={t('signup.form.passwordCheck.placeholder')} />
          {(status === 'error') &&
            <Form.Group className="mb-1">
              <Form.Text className="text-danger">
              {t(error.message)}
              </Form.Text>
            </Form.Group>}
          <Form.Group controlId="password">
            <Button className="w-100" type="submit" disabled={(isSubmitting || !isValid)}>{t('signup.form.submit.label')}</Button>
          </Form.Group>
        </Form>)}
    </Formik>
  </>
}

const mapStateToProps = (state: any) => {
  return ({
    status: state.auth.signup.status,
    error: state.auth.signup.error
  })
}

export default connect(mapStateToProps, null)(Signup);
