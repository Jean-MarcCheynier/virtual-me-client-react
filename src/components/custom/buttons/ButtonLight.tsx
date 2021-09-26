import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './ButtonLight.module.scss'

const ButtonLight = (props: any) => {

  const { className, ...others } = props;
  
  return <Button variant="outline-secondary" className={`${className} ${styles.ButtonLight}`} {...others}/>
}

export default ButtonLight;