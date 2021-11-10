import React, { useMemo } from 'react'
import { IExperience } from '@virtual-me/virtual-me-ts-core';
import { format } from 'date-fns';
import { Col, Image, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import Translate from './Translate';
import { fr, enUS } from 'date-fns/locale'

const dateFormat = 'MMM yyyy'
const locales: any = {
  "en": enUS,
  "fr": fr
}

const Experiences: React.FC<{ experiences: IExperience[], lang: string }> = ({ experiences, lang }) => {
  const [t] = useTranslation('common');
  const locale: Locale = useMemo(() => {
    if (locales[lang]!== undefined)
      return locales[lang];
    else
      return enUS
  }, [lang]);

  return <Row>
    <h4 className="text-primary">{t('CV.experiences.title')}</h4>
    {
      experiences && experiences.sort((a, b) => (new Date(b.from).getTime() - new Date(a.from).getTime()))
        .map((experience: IExperience) => {
          return <>
            <Row>
              <Col xs={1}>
                <Image fluid width="100" src={experience.company.logo} />
              </Col>
              <Col xs={11}>
                <h5><Translate translation={experience.title.translation} /></h5>
                <div><em>{t('CV.experiences.At')} <a href={experience.company.link}>{experience.company.name}</a></em></div>
                <small>
                  <strong>{format(new Date(experience.from), dateFormat, { locale: locale })}</strong>
                  {` - `}
                  <strong>{format(new Date(experience.to), dateFormat, { locale: locale })}</strong>
                </small>
                <ReactMarkdown>{experience.description.translation[lang]}</ReactMarkdown>
              </Col>
            </Row>

            
          </>
        })
    }
    </Row>
}

const mapStateToProps = (state: any) => ({
  experiences: state.cv?.list[0]?.experiences,
  lang: state.preferences.lang
})

export default connect(mapStateToProps)(Experiences);