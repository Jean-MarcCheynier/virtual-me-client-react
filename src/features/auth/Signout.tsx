import React from 'react';

import {Dropdown} from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa'

import styles from './Signout.module.scss';
import { signout } from './authSlice';
import { useTranslation } from 'react-i18next';

function Signout(props: any) {
  
  const { auth } = props;
  const dispatch = useDispatch();
  const [t]  = useTranslation('common');
  
  const handleSignout = () => {
    dispatch(signout());
  }
  
  if (auth.role) {
    return <Dropdown className="position-fixed" style={{ top: '20px', right: '50px', zIndex: 100 }}>
        <Dropdown.Toggle variant="success"
          className={`${styles.customToggleBtn} rounded-circle`}
          id="dropdown-basic">
          <FaRegUserCircle size="3x"/>
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item onClick={handleSignout}>{t('menu.signout')}</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
  } else {
    return null;
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Signout)