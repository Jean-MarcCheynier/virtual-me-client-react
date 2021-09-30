import React,  { useState, useRef } from 'react';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import styles from './ButtonLight.module.scss'
import { useTranslation } from 'react-i18next';

const ButtonLight = (props: any) => {

  const { className, id, tooltip, ...others } = props;
  const [t] = useTranslation('common');
  const [show, setShow] = useState<boolean>(false);
  const target = useRef(null)
  
  return (<>
  <Button ref={target} 
    onMouseEnter={() => setShow(true)} 
    onMouseLeave={() => setShow(false)} 
    variant="outline-secondary" 
    className={`${className} ${styles.ButtonLight}`} {...others}/>
      { tooltip && <Overlay target={target.current} show={show} placement="left">
        {(props) => (
          <Tooltip id={`${id}-tooltip`} {...props}>
            {t(tooltip)}
          </Tooltip>
        )}
      </Overlay>}
  </>)
}

export default ButtonLight;