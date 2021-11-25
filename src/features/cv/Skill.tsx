import React, { useMemo } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ISkill, SkillType } from '@virtual-me/virtual-me-ts-core';
import { Badge, Col, Row, Card } from 'react-bootstrap';
import Translate from './Translate';
import { HoverLevel, Level } from './Level';
import { useTranslation } from 'react-i18next';
import { FaAngular, FaGitAlt, FaJava, FaJsSquare, FaNodeJs, FaReact, FaPython, FaHtml5, FaDocker } from 'react-icons/fa';
import { DiJqueryLogo } from 'react-icons/di'
import { selectSkill } from './cvSlice';

import './skill.scss';


const SkillIcons: Record<string, JSX.Element> = {
  'JS': <FaJsSquare />,
  'NODE': <FaNodeJs />,
  'JAVA': <FaJava />,
  'REACT': <FaReact />,
  'ANGULAR': <FaAngular />,
  'DOCKER': <FaDocker />,
  'GIT': <FaGitAlt />,
  'WEB': <FaHtml5 />,
  'PYTHON': <FaPython />,
  'JQUERY': <DiJqueryLogo />,
  'ENGLISH': <span className="flag-icon flag-icon-gb"></span>,
  'FRENCH': <span className="flag-icon flag-icon-fr"></span>,
  'GERMAN': <span className="flag-icon flag-icon-de"></span>,
  'FARSI': <span className="flag-icon flag-icon-ir"></span>
}


const Skill: React.FC<{ skill: any, onSelect: (skill: ISkill) => void }> = ({ skill, onSelect }) => {
  const [t] = useTranslation('common');
  
  const textContent = skill.selected ? "text-white" : "";
  const textSpecial = skill.selected ? "text-white" : "text-primary";
  
  return <Card className={`skill-container ${skill.selected ? "selected bg-primary p-1 mb-1" :"mb-1 py-1 border-1 border-white"}`}><Row className={ skill.selected?"active":"" } onClick={() => onSelect(skill)}>
    <Col className={textSpecial} xs={1}>{SkillIcons[skill.name] }</Col>
    <Col className={textContent} xs={8}><Translate translation={skill.translation} /></Col>
    <Col className={textSpecial} xs={3}>
      <HoverLevel hoverContent={t(`CV.skills.level.${skill.level}.description`)}>
        {(skill.type === SkillType.LANGUAGE) ?
          <Badge bg="primary" pill={true}>{ skill.level}</Badge>:
          <Level level={skill.level} /> 
        }
      </HoverLevel>
    </Col>
  </Row>
  </Card>
}

export const SkillMini: React.FC<{ skillName: string }> = ({ skillName }) => {
  const skills = useSelector((state: any) => state?.cv?.list[0]?.skills); 
  const skill = skills.find((item: any) => (item.name === skillName));
  return <>{skill && <Badge pill bg={skill.selected ? "primary" : "secondary"}><span>{SkillIcons[skill.name]}&nbsp;{skill.name}</span></Badge>}</>
}

const Skills: React.FC<{ skills: ISkill[], selectSkill: (skill: ISkill) => void }> = ({ skills, selectSkill }) => {
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
  
  return <>
    <h4 className="text-primary">{t('CV.skills.title')}</h4>
    {skillGroups && Object.entries(skillGroups).map(([skillType, skillList]) => {
      return <React.Fragment key={skillType}>
        <h5>{t(`CV.skills.skillType.${skillType}`)}</h5>
        {skillList && skillList.map((skill, index) => (
          <Skill key={index} onSelect={selectSkill} skill={skill} />)
        )}
        </React.Fragment>
    })
  }</>
}

const mapStateToProps = (state: any) => ({
  skills: state.cv?.list[0]?.skills,
  lang: state.preferences.lang
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ selectSkill }, dispatch)
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
