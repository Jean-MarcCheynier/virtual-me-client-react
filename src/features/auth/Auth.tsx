import React from 'react';
import Signin from './Signin';
import Signup from './Signup';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch, useLocation } from 'react-router-dom';

const Auth = function() {

    // NB: useParams returns null outside a Route we have to use the hook useLocation to extract the 'lang' 
    const location = useLocation();
    const lang = location.pathname.split('/')[1];
    const [t] = useTranslation('common');

    return ( <div>
        <Switch>
            <Route path={`/${lang}/signup`}>
                <Signup/>
                <div className="my-1 text-end text-primary">
                    <Link to={`/${lang}/signin`}>{t('auth.linkto.signin')}</Link>
                </div>
            </Route>
            <Route path={[`/:lang/home/signin`, `/:lang/home`]}>
                <Signin/>
                <div className="my-1 text-end text-primary">
                    <Link to={`/${lang}/signup`}>{t('auth.linkto.signup')}</Link>
                </div>
            </Route>
        </Switch>
    </div>)
}

export default Auth;
