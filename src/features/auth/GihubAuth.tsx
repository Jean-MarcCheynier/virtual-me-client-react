import { useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';
import { connect } from 'react-redux';
import { setToken, geMeAsync } from './authSlice'
import { FaSpinner } from 'react-icons/fa';

const GihubAuth = (props: any) => {
  
  const { search } = useLocation();
  const param = useMemo(() => new URLSearchParams(search), [search])
  const history = useHistory();
  const { setToken, geMeAsync, auth } = props;
  
  useEffect(() => {
    const token = param.get('token');
    if (token) {
      setToken(token)
      geMeAsync().then((r: any) => {
        console.log("Writting in local storage")
        console.log({ ...r.payload, "jwt": token })
        const userToken = { ...r.payload, "jwt": token };
        window.sessionStorage.setItem('virtualMe', JSON.stringify(userToken));
      })
    }
  }, [geMeAsync, setToken, param])
  
  useEffect(() => {
    if (auth.role) {
      history.push('/en/chat')
    }
  }, [auth, history])
  return <div className="text-center text-secondary mt-5" style={{ width: '100vw', height: '100vh' }}><FaSpinner size={100}/></div>
}

const mapStateToProps = (state:any) => ({
  lang: state.preferences.lang,
  auth: state.auth
})

export default connect(mapStateToProps, { setToken, geMeAsync })(GihubAuth);