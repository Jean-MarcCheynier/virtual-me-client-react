import React, { useMemo } from 'react';
import { IDegree } from '@virtual-me/virtual-me-ts-core';
import { Image, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Translate from './Translate';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale'
import SortableSection from './SortableContainer';

const dateFormat = 'MMM yyyy'
const locales: any = {
  "en": enUS,
  "fr": fr
}

interface IEducationProps extends IDegree {
  lang: string
}

const Education: React.FC<IEducationProps> = ({ title, school, date, lang }) => {
  const [t] = useTranslation('common');
  const locale: Locale = useMemo(() => {
    if (locales[lang] !== undefined)
      return locales[lang];
    else
      return enUS
  }, [lang]);
  
  return <Row className="mb-2">
      <Col xs={1} className="pe-0 pe-sm-2 px-md-auto"><Image src={school.logo} fluid /> </Col>
        <Col xs={11}>
          <h5><Translate translation={title.translation} /></h5>
          <div><em>{t('CV.education.At')}  <a href="degree.school.link">{school.name}</a></em></div>
          <small><strong>{format(new Date(date), dateFormat, { locale: locale })}</strong></small>
          
        </Col>
      </Row>
}

const Educations: React.FC<{ degrees: IDegree[], lang: string }> = ({ degrees, lang }) => {
  const [t] = useTranslation('common');
  return <SortableSection title={t('CV.education.title')}
    sort={(a: IDegree, b: IDegree) => (new Date(a.date).getTime() - new Date(b.date).getTime())}
    items={degrees} Component={Education} />
}

const mapStateToProps = (state: any) => ({
  degrees: state.cv?.list[0]?.degrees,
  lang: state.preferences.lang
})

export default connect(mapStateToProps)(Educations);