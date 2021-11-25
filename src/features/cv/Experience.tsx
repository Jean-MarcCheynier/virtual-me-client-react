import React, { useMemo } from 'react'
import { IExperience } from '@virtual-me/virtual-me-ts-core';
import { format } from 'date-fns';
import { Col, Image, Row, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { connect, useDispatch, useSelector } from 'react-redux';
import Translate from './Translate';
import { fr, enUS } from 'date-fns/locale'
import SortableSection from './SortableContainer';
import { SkillMini } from './Skill';

const dateFormat = 'MMM yyyy'
const locales: any = {
  "en": enUS,
  "fr": fr
}

interface IExperienceProps extends IExperience {
  lang: string
}

const Experience: React.FC<any> = (props) => {
  const { company, title, from, to, description, skills, lang } = props;
  const [t] = useTranslation('common');
  const locale = locales[lang];
  
  const cvSkills = useSelector((state: any) => state?.cv?.list[0]?.skills);
  
  
  const matchSelectedSkill = useMemo(() => {
    const selectedList = cvSkills.filter((item: any) => (item.selected));
    if (selectedList.length && skills.length) {
      for (let item of selectedList) {
        if (skills.includes(item.name)) {
          return true
        }
      }
    }
    return false;
  }, [cvSkills, skills])
  
  return <Card className={matchSelectedSkill ?"shadow my-3 p-2 border-primary border-1":"py-2 border-0"}>
    <Row>
      <Col xs={1} className="pe-0 pe-sm-2 px-md-auto">
        <Image fluid width="100" src={company.logo} />
      </Col>
      <Col xs={11}>
        <h5 className={matchSelectedSkill?"text-primary ":"" }><Translate translation={title.translation} /></h5>
        <div><em>{t('CV.experiences.At')} <a href={company.link}>{company.name}</a></em></div>
        <small>
          <strong>{format(new Date(from), dateFormat, { locale: locale })}</strong>
          {` - `}
          <strong>{format(new Date(to), dateFormat, { locale: locale })}</strong>
        </small>
        <ReactMarkdown>{description.translation[lang]}</ReactMarkdown>
      </Col>
    </Row>
    {(skills && skills.length) &&
      <div>
      {skills.map((skillName: any, index: number) => (<span key={index} className="mx-1"><SkillMini skillName={skillName} /></span>))}
      </div>
    }
    </Card>
}



const Experiences: React.FC<{ experiences: IExperience[], lang: string }> = ({ experiences, lang }) => {
  const [t] = useTranslation('common');
  return <SortableSection title={t('CV.experiences.title')}
    sort={(a: IExperience, b: IExperience) => (new Date(a.from).getTime() - new Date(b.from).getTime() )}
    items={experiences} Component={Experience}
    args={{ lang }}
  />
} 

const mapStateToProps = (state: any) => ({
  experiences: state.cv?.list[0]?.experiences,
  lang: state.preferences.lang
})

export default connect(mapStateToProps)(Experiences);