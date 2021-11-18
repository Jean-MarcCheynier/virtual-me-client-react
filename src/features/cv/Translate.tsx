import ITranslatable from '@virtual-me/virtual-me-ts-core/lib/util/Translatable';
import React from 'react';
import { connect } from 'react-redux';

interface ITranslateProps extends ITranslatable {
  lang: string
}

const Translate: React.FC<ITranslateProps> = (props) => {
  const { lang, translation } = props;
  
  const content = lang?translation[lang]:translation['en'];
  
  return <>{content}</>
}

const mapStateToProps = (state: any) => ({
  lang: state.preferences.lang
})

export default connect(mapStateToProps)(Translate)