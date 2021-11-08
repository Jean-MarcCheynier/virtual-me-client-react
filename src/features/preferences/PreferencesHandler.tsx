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

    
    //On lang change update lang attributes present in i18n object and in the url
    useEffect(() => {
        if (lang) {
            const urlLang = location.pathname.split('/')[1]
            if (lang !== urlLang) {
                const newLoc = location.pathname.replace(new RegExp(/(\/)([^/]*)(\/.*)/), `$1${lang}$3`)
                history.push(newLoc);
            }
            if (lang !== i18n.language) {
                i18n.changeLanguage(lang);
            }
        }
    }, [lang, history, location])
    return <></>
}

const mapStateToProps = ((state:any) => ({
    'lang': state.preferences.lang
}));

export default connect(mapStateToProps, null)(PreferencesHandler)