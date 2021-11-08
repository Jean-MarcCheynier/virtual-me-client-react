import React from 'react';
import { ICv } from '@virtual-me/virtual-me-ts-core';
import { connect } from 'react-redux';
import Infos from './Info';
import { Card, Container } from 'react-bootstrap';
import Skills from './Skill';
import Experiences from './Experience';

interface ICVProps {
  cv: ICv,
  lang: string,
}

const CV: React.FC<ICVProps> = (props: ICVProps) => {
  return <Card>
    <Container><Infos /></Container>
    <Container><Skills /></Container>
    <Container><Experiences /></Container>
  </Card>
}

const mapStateToProps = (state: any) => {
  return {
    cv: state.cv.list[0],
    lang: state.preferences.lang
  }
}

export default connect(mapStateToProps)(CV);