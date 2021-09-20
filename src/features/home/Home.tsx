import React from 'react'
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IAuthState } from '../auth/authSlice';
import Chat from '../chat/Chat';

type HomeProps = {
  auth: IAuthState;
}


function Home(props: HomeProps) {
  const { auth } = props;
  return <Container>
    <Chat authenticated={ auth.role !== undefined } />
    
  </Container>
}

const mapStateToProps = (state: any) => ({ auth: state.auth })

export default connect(mapStateToProps, null)(Home)