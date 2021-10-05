import { useAppDispatch } from '../../app/hooks';
import { signinAsync, /*signout*/ } from './authSlice';
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import * as Yup from 'yup';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import Form from 'react-bootstrap/Form';
import FormikFieldControl from '../../components/custom/formik/FormikFieldControl';
import { connect } from 'react-redux';


const SigninSchema = Yup.object().shape({
  login: Yup.string()
    .required('signup.form.login.error.required'),
  password: Yup.string()
    .required('signup.form.password.error.required'),
});

interface Values {
  login: string;
  password: string;
}

const initialValues: Values = {
  'login': '',
  'password': ''
}

function Signin(props: RouteComponentProps<{}, any, unknown> | any) {
  const [t] = useTranslation('common');
  const dispatch = useAppDispatch();
  const { status, error } = props;
  
  const handleOnSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    dispatch(signinAsync(values)).then(() => { setSubmitting(false) });
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
      validationSchema={SigninSchema}
    >
      {({ handleSubmit, isSubmitting, errors, touched, isValid }: FormikProps<Values>) => (
        <Form noValidate onSubmit={handleSubmit}>
          <FormikFieldControl errors={errors} touched={touched} name="login" placeholder={t('signin.form.login.placeholder')} />
          <FormikFieldControl errors={errors} touched={touched} type="password" name="password" placeholder={t('signin.form.password.placeholder')} />

          {(status === 'error') &&
            <Form.Group className="mb-1">
              <Form.Text className="text-danger">
                {t(error.message)}
              </Form.Text>
            </Form.Group>}
          <Form.Group>
            <Button className="w-100" disabled={!isValid || isSubmitting} type="submit">{t('signin.form.submit.label')}</Button>
          </Form.Group>
        </Form>)}
    </Formik> )

}

const mapStateToProps = (state: any) => {
  return ({
    status: state.auth.signin.status,
    error: state.auth.signin.error
  })
}

export default connect(mapStateToProps, null)(Signin);
