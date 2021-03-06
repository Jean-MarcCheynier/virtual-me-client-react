import React from 'react';
import Signin from './Signin';
import Signup from './Signup';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaGithubAlt } from 'react-icons/fa';

const Auth = function() {

    // NB: useParams returns null outside a Route we have to use the hook useLocation to extract the 'lang' 
    const location = useLocation();
    const lang = location.pathname.split('/')[1];
    const [t] = useTranslation('common');

    return ( <div className="mt-5 mx-2">
        <Switch>
            <Route path={`/:lang/chat/signup`}>
                <Signup />
                <div className="my-1 text-end text-primary">
                    <Link to={`/${lang}/chat/signin`}>{t('auth.linkto.signin')}</Link>
                </div>
            </Route>
            <Route path={[`/:lang/chat/signin`, `/:lang/chat`]}>
                <Signin />
                <Button variant="dark" className="mt-1 w-100" href={`${process.env.REACT_APP_VIRTUAL_ME_API_BASE_URL}/auth/github`}>
                    <FaGithubAlt />&nbsp;{t('signin.github.submit.label')}
                </Button>
                <div className="my-1 text-end text-primary">
                    <Link to={`/${lang}/chat/signup`}>{t('auth.linkto.signup')}</Link>
                </div>
            </Route>
        </Switch>
    </div>)
}

export default Auth;
