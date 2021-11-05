import React from 'react';
import { ICv } from '@virtual-me/virtual-me-ts-core';
import { connect } from 'react-redux';
import Infos from './Info';
import { Card } from 'react-bootstrap';
import Skills from './Skill';

interface ICVProps {
  cv: ICv,
  lang: string,
}

const CV: React.FC<ICVProps> = (props: ICVProps) => {
  return <Card>
    <Infos />
    <Skills/>
  </Card>
}

const mapStateToProps = (state: any) => {
  return {
    cv: state.cv.list[0],
    lang: state.preferences.lang
  }
}

export default connect(mapStateToProps)(CV);