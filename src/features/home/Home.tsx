import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IAuthState } from '../auth/authSlice';
import Chat from '../chat/Chat';
import { CSSTransition } from 'react-transition-group';
import { ChatPosition } from '../chat/chatSlice';

type HomeProps = {
  auth: IAuthState;
  displayChat: boolean;
}


const Home = (props: HomeProps) => {
  const { displayChat } = props;
  
  return <Container fluid>
    <Row>
      <CSSTransition
        in={displayChat}
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
  displayChat: state.chat.position === ChatPosition.FIXED
})

export default connect(mapStateToProps)(Home)