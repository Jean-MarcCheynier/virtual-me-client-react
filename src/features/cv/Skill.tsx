import React from 'react';

import { ILevel, ISkill, LevelEnum } from '@virtual-me/virtual-me-ts-core';
import { Col } from 'react-bootstrap';
import Translate from './Translate';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { connect } from 'react-redux';


const Level: React.FC<{ level: LevelEnum }> = (props) => {
  const { level } = props;
  switch (level) {
    case LevelEnum.JUNIOR:
      return <span><FaStar /><FaRegStar /><FaRegStar /></span>
    case LevelEnum.MEDIOR:
      return <span><FaStar /><FaStar /><FaRegStar /></span>
    case LevelEnum.SENIOR:
      return <span><FaStar /><FaStar /><FaStar /></span>
    default:
      return <></>;
  }
}


const Skill: React.FC<{ skill: ISkill }> = ({ skill }) => {
  return <>
    <Col xs={1}></Col>
    <Col xs={5}><Translate translation={skill.name} /></Col>
    <Col xs={6}><Level level={skill.level}/></Col>
  </>
}

const Skills: React.FC<{ skills: ISkill[] }> = ({ skills }) => {
  return <>{
    skills.map((skill: ISkill) => {
      return <Skill skill={skill}/>
    })
  }</>
}

const mapStateToProps = (state: any) => ({
  skills: state.cv?.list[0]?.skills,
  lang: state.preferences.lang
})

export default connect(mapStateToProps)(Skills);
