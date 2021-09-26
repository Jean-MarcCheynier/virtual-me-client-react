import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IAuthState } from '../auth/authSlice';
import Chat from '../chat/Chat';
import { CSSTransition } from 'react-transition-group';
import { ChatPosition } from '../chat/chatSlice';

type HomeProps = {
  auth: IAuthState;
  position: ChatPosition;
}


const Home = (props: HomeProps) => {
  const { position } = props;
  
  return <Container fluid>
    <Row>
      <CSSTransition
        in={position === ChatPosition.FIXED}
        timeout={500}
        unmountOnExit
        classNames='fade'>
        <Col className="d-xs-none" md="3" lg="4">
          <Chat />
        </Col>
      </CSSTransition>
      <Col >2 of 2</Col>
    </Row>
  </Container>
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  position: state.chat.position
})

export default connect(mapStateToProps)(Home)