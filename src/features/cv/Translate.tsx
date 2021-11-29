import React from 'react';
import ITranslatable from '@virtual-me/virtual-me-ts-core/lib/util/Translatable';
import { useSelector } from 'react-redux';

interface ITranslateProps extends ITranslatable {
  lang?: string;
}

const Translate : React.FC<ITranslateProps> = (props) => {
  const lang = useSelector((state: any) => state.preferences.lang)
  const { translation } = props;
  const content:string = lang?translation[lang]:translation['en'];
  
  return <>{content}</>
}



export default Translate;