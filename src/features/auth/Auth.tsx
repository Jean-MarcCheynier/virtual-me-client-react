import React, {useState} from 'react';
import Signin from './Signin';
import Signup from './Signup';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch } from 'react-router-dom';

const Auth = function() {

    const [signin, setSignin] = useState(true)
    const [t] = useTranslation('common');
    return ( <div>
        <Switch>
            <Route path='/home/signup'>
                <Signup/>
                <div className="my-1 text-end text-primary">
                    <Link to="/home/sigin">{t('auth.linkto.signin')}</Link>
                </div>
            </Route>
            <Route  path={['/home/signin', '/home']}>
                <Signin/>
                <div className="my-1 text-end text-primary">
                    <Link to="/home/signup">{t('auth.linkto.signup')}</Link>
                </div>
            </Route>
        </Switch>
    </div>

    )
}

export default Auth;
