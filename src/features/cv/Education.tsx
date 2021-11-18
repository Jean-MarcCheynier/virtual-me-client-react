import React, { useMemo } from 'react';
import { IDegree } from '@virtual-me/virtual-me-ts-core';
import { Image, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Translate from './Translate';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale'

const dateFormat = 'MMM yyyy'
const locales: any = {
  "en": enUS,
  "fr": fr
}

const Education: React.FC<{ degrees: IDegree[], lang: string }> = ({ degrees, lang }) => {
  const [t] = useTranslation('common');
  
  const locale: Locale = useMemo(() => {
    if (locales[lang] !== undefined)
      return locales[lang];
    else
      return enUS
  }, [lang]);
  
  return <>
    <h4 className="text-primary">Education</h4>
    {degrees && degrees.map((degree: IDegree, index: number) => (
      <Row key={index}>
        <Col xs={1}><Image src={degree.school.logo} fluid /> </Col>
        <Col xs={11}>
          <h5><Translate translation={degree.title.translation} /></h5>
          <div><em>{t('CV.education.At')}  <a href="degree.school.link">{degree.school.name}</a></em></div>
          <small><strong>{format(new Date(degree.date), dateFormat, { locale: locale })}</strong></small>
          
        </Col>
      </Row>
    ))}
  </>
}

const mapStateToProps = (state: any) => ({
  degrees: state.cv?.list[0]?.degrees,
  lang: state.preferences.lang
})

export default connect(mapStateToProps)(Education);