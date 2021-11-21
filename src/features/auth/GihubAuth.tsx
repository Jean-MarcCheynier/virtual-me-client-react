import { useEffect, useMemo } from 'react';
import { useParams, useHistory, useLocation } from 'react-router';
import { connect } from 'react-redux';
import { setToken, geMeAsync } from './authSlice'
import { FaSpinner } from 'react-icons/fa';

const GihubAuth = (props: any) => {
  
  const params = useParams<any>();
  const { search } = useLocation();
  const param = useMemo(() => new URLSearchParams(search), [search])
  const history = useHistory();
  const { setToken, geMeAsync, lang, auth } = props;
  
  useEffect(() => {
    console.log(param.get("token"))
    const token = param.get('token');
    window.sessionStorage.setItem('virtualMe', JSON.stringify({ "jwt": token }));
    setToken(token)
    geMeAsync().then(() => {console.log("done")})
  }, [])
  
  useEffect(() => {
    if (auth.role) {
      history.push('/en/chat')
    }
  }, [auth])
  return <div className="text-center text-secondary mt-5" style={{ width: '100vw', height: '100vh' }}><FaSpinner size={100}/></div>
}

const mapStateToProps = (state:any) => ({
  lang: state.preferences.lang,
  auth: state.auth
})

export default connect(mapStateToProps, { setToken, geMeAsync })(GihubAuth);