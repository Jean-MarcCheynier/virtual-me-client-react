import React from 'react';
import Signin from './Signin';
import Signup from './Signup';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

const Auth = function() {

    let { url } = useRouteMatch();
    const [t] = useTranslation('common');
    return ( <div>
        <Switch>
            <Route path='/:lang/home/signup'>
                <Signup/>
                <div className="my-1 text-end text-primary">
                    <Link to={`${url}/signin`}>{t('auth.linkto.signin')}</Link>
                </div>
            </Route>
            <Route path={[`${url}/signin'`, `${url}`]}>
                <Signin/>
                <div className="my-1 text-end text-primary">
                    <Link to={`${url}/signup`}>{t('auth.linkto.signup')}</Link>
                </div>
            </Route>
        </Switch>
    </div>

    )
}

export default Auth;
