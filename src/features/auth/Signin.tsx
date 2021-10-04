import { useAppDispatch } from '../../app/hooks';
import { signinAsync, /*signout*/ } from './authSlice';
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import * as Yup from 'yup';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import { Form as BForm } from 'react-bootstrap';
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
  const { status } = props;
  
  const handleOnSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    dispatch(signinAsync(values))
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
      validationSchema={SigninSchema}
    >
      {({ isSubmitting, errors, touched, isValid }: FormikProps<Values>) => (
        <Form>
          <FormikFieldControl errors={errors} touched={touched} name="login" placeholder={t('signin.form.login.placeholder')} />
          <FormikFieldControl errors={errors} touched={touched} type="password" name="password" placeholder={t('signin.form.password.placeholder')} />

          {(status === 'error') &&
            <BForm.Group>
            <BForm.Text className="text-danger">
              {t('signin.form.error.unauthorized')}
            </BForm.Text>
          </BForm.Group>}
          <BForm.Group>
            <Button className="w-100" type="submit">{t('signin.form.submit.label')}</Button>
          </BForm.Group>
        </Form>)}
    </Formik> )

}

const mapStateToProps = (state: any) => ({
  status: state.auth.signin.status
})

export default connect(mapStateToProps, null)(Signin);
