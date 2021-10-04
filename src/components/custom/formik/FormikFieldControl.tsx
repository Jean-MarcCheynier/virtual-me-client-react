import { Field, FieldAttributes } from "formik";
import { Form } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

export default function FormikFieldControl(props: FieldAttributes<any>) {
  
  const { errors, touched, name, ...other } = props;
  const [t] = useTranslation('common');
  
  const showValid = !errors[name] && touched[name]
  const showInvalid = errors[name] && touched[name]
  
  return <Form.Group className="mb-1" controlId="login">
    <Field className={`${showValid && 'is-valid'} ${showInvalid ? 'is-invalid' : ''}`} name={name} {...other}  as={Form.Control} />
    {errors[name] && touched[name] ? (
      <Form.Text className="text-danger">
        {t(errors[name])}
      </Form.Text>
    ) : null}
    </Form.Group>
}