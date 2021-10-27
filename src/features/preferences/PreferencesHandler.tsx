/** Redirect to the preferred language */
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import i18n from "i18next";

interface PreferencesProps{
    lang?: string
}

const PreferencesHandler = (props: PreferencesProps) => {

    const { lang } = props;
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if(lang) {
            const newLoc = location.pathname.replace(new RegExp(/(\/)(.+)(\/.*)/), `$1${lang}$3`)
            i18n.changeLanguage(lang);
            history.push(newLoc);
        }
    }, [lang])

    return <></>

}

const mapStateToProps = ((state:any) => ({
    'lang': state.preferences.lang
}));

export default connect(mapStateToProps, null)(PreferencesHandler)