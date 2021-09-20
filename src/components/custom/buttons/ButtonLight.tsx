import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './ButtonLight.module.scss'

const ButtonLight = (props: any) => {
  
  return <Button variant="outline-secondary" className={ styles.ButtonLight } {...props}/>
}

export default ButtonLight;