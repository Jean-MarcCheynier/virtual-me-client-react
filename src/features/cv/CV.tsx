import React from 'react';
import { ICv } from '@virtual-me/virtual-me-ts-core';
import { connect } from 'react-redux';
import Infos from './Info';
import { Card, Container } from 'react-bootstrap';
import Skills from './Skill';
import Experiences from './Experience';
import Educations from './Education';

interface ICVProps {
  cv: ICv,
  lang: string,
}





const CV: React.FC<ICVProps> = (props: ICVProps) => {

  return <>

    <Card className="mt-2">
    <Container className="px-2 px-sm-4">
      <Infos />
      <hr/>
    </Container>
    <Container className="px-2 px-sm-4">
      <Skills />
      <hr />
    </Container>
    <Container className="px-2 px-sm-4">
      <Experiences />
      <hr />
    </Container>
    <Container className="px-2 px-sm-4">
      <Educations />
    </Container>
      </Card>
  </>
}

const mapStateToProps = (state: any) => {
  return {
    cv: state.cv.list[0],
    lang: state.preferences.lang
  }
}

export default connect(mapStateToProps)(CV);