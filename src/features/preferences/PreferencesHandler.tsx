/** Redirect to the preferred language */
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import i18n from "i18next";
import { selectMessageList } from '../chat/chatSlice';
import { IMessage } from '@virtual-me/virtual-me-ts-core';
import { setLang } from './preferencesSlice';
import { useDispatch } from 'react-redux';

interface PreferencesProps{
    lang?: string,
    messageList?: IMessage<any>[]
}

const PreferencesHandler = (props: PreferencesProps) => {

    const { lang, messageList } = props;
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    
    //On lang change update lang attributes present in i18n object and in the url
    useEffect(() => {
        const urlLang = location.pathname.split('/')[1];
        const validUrlLang = ['en', 'fr'].includes(urlLang);
        if (lang) {
            if (validUrlLang && lang !== urlLang) {
                const newLoc = location.pathname.replace(new RegExp(/(\/)([^/]*)(\/.*)/), `$1${lang}$3`)
                history.push(newLoc);
            }
            if (lang !== i18n.language) {
                i18n.changeLanguage(lang);
            }
        }
    }, [lang, history, location])
    
    //On message received change lang attributes present in i18n object and in the url

    return <></>
}

const mapStateToProps = ((state:any) => ({
    lang: state.preferences.lang,
    messageList: selectMessageList(state)
}));

export default connect(mapStateToProps, null)(PreferencesHandler)