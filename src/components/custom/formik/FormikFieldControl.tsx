import { Field, FieldAttributes } from "formik";
import { Form } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

export default function FormikFieldControl(props: FieldAttributes<any>) {
  
  const { errors, touched, name, ...other } = props;
  const [t] = useTranslation('common');
  
  return <Form.Group className="mb-1" controlId={name}>
    <Field isInvalid={touched[name] && !!errors[name]} name={name} {...other} as={Form.Control} />
    <Form.Control.Feedback type="invalid">
      {t(errors[name])}
    </Form.Control.Feedback>
  </Form.Group>
  
}