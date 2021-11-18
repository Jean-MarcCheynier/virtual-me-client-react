import React from 'react';
import { ICv } from '@virtual-me/virtual-me-ts-core';
import { connect } from 'react-redux';
import Infos from './Info';
import { Card, Container } from 'react-bootstrap';
import Skills from './Skill';
import Experiences from './Experience';
import Education from './Education';

interface ICVProps {
  cv: ICv,
  lang: string,
}

const CV: React.FC<ICVProps> = (props: ICVProps) => {
  return <Card>
    <Container>
      <Infos />
      <hr/>
    </Container>
    <Container>
      <Skills />
      <hr />
    </Container>
    <Container>
      <Experiences />
      <hr />
    </Container>
    <Container>
      <Education />
    </Container>
  </Card>
}

const mapStateToProps = (state: any) => {
  return {
    cv: state.cv.list[0],
    lang: state.preferences.lang
  }
}

export default connect(mapStateToProps)(CV);