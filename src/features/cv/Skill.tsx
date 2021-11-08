import React, { useMemo } from 'react';
import { ISkill, SkillType } from '@virtual-me/virtual-me-ts-core';
import { Badge, Col, Row } from 'react-bootstrap';
import Translate from './Translate';
import { connect } from 'react-redux';
import { HoverLevel, Level } from './Level';
import { useTranslation } from 'react-i18next';
import { FaAngular, FaGitAlt, FaJava, FaJsSquare, FaNodeJs, FaReact, FaPython, FaSass, FaHtml5 } from 'react-icons/fa';

const SkillIcons: Record<string, JSX.Element> = {
  'JS': <FaJsSquare />,
  'NODE': <FaNodeJs />,
  'JAVA': <FaJava />,
  'REACT': <FaReact />,
  'ANGULAR': <FaAngular />,
  'GIT': <FaGitAlt />,
  'WEB': <FaHtml5 />,
  'PYTHON': <FaPython />,
  'ENGLISH': <span className="flag-icon flag-icon-gb"></span>,
  'FRENCH': <span className="flag-icon flag-icon-fr"></span>,
  'GERMAN': <span className="flag-icon flag-icon-de"></span>,
  'FARSI': <span className="flag-icon flag-icon-ir"></span>
}


const Skill: React.FC<{ skill: ISkill }> = ({ skill }) => {
  const [t] = useTranslation('common');
  return <>
    <Col className="text-primary" xs={1}>{SkillIcons[skill.name] }</Col>
    <Col xs={8}><Translate translation={skill.translation} /></Col>
    <Col className="text-primary" xs={3}>
      <HoverLevel hoverContent={t(`CV.skills.level.${skill.level}.description`)}>
        {(skill.type === SkillType.LANGUAGE) ?
          <Badge bg="primary" pill={true}>{ skill.level}</Badge>:
          <Level level={skill.level} /> 
        }
      </HoverLevel>
    </Col>
  </>
}

const Skills: React.FC<{ skills: ISkill[] }> = ({ skills }) => {
  
  const [t] = useTranslation('common');
  
  //GroupSkills by type
  const skillGroups: { [key: string]: ISkill[] } = useMemo(() => {
    if (skills) {
      return skills.reduce((prev: any, current: any) => {
        (prev[current['type']] = prev[current['type']] || []).push(current);
        return prev;
      }, {})
    }
    return false
  }, [skills])
  
  return <Row>
    <h4 className="text-primary">{t('CV.skills.title')}</h4>
    {skillGroups && Object.entries(skillGroups).map(([skillType, skillList]) => {
      return <>
        <h5>{t(`CV.skills.skillType.${skillType}`)}</h5>
        {skillList && skillList.map(skill => (<Skill skill={skill} />))}
        </>
    })
  }</Row>
}

const mapStateToProps = (state: any) => ({
  skills: state.cv?.list[0]?.skills,
  lang: state.preferences.lang
})

export default connect(mapStateToProps)(Skills);
