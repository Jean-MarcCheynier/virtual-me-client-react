import React from 'react';
import { useTranslation } from 'react-i18next';

const Presentation: React.FC<any> = (props) => {
  
  const [t] = useTranslation('common');
  
  return <div className="my-5">
    <h1 className="text-primary">{t('presentation.title1')}</h1>
    <p className="fs-4">
      {t('presentation.text1')}
    </p>
    <h2 className="text-primary">{t('presentation.title2')}</h2>
    <p className="fs-4 text-justify">
      {t('presentation.text2')}

    </p>
  </div>
}

export default Presentation;