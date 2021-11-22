import React from 'react';

import {Dropdown, Image} from 'react-bootstrap';
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
  
  let imgUrl = "";
  if (auth.profile) {
    if (auth.profile.github) {
      imgUrl = (auth.profile.github.photos.length) ? auth.profile.github.photos[0].value : "";
    }
  }
  
  
  if (auth.role) {
    return <Dropdown className="position-fixed" style={{ top: '1em', right: '1em', zIndex: 100 }}>
      <Dropdown.Toggle variant="success" 
        className={`${styles.customToggleBtn} rounded-circle ${imgUrl?"p-0":""}`}
        id="dropdown-basic">
        {imgUrl ?
          <Image className="p border-0 rounded-circle"  fluid src={imgUrl}/>
          :<FaRegUserCircle size="3x" />}
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