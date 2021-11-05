import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IAuthState } from '../auth/authSlice';
import { CSSTransition } from 'react-transition-group';
import { ChatLayout } from '../chat/chatSlice';
import FloatingChat from '../chat/FloatingChat';
import { selectChatLayout } from './../chat/chatSlice';
import Signout from '../auth/Signout';
import { Route, Switch, useRouteMatch } from 'react-router';
import CV from '../cv/CV';

type HomeProps = {
  auth: IAuthState;
  layout: ChatLayout;
}

const Home = (props: HomeProps) => {
  const { layout } = props;
  let { path, url } = useRouteMatch();
  
  return <Container fluid>
    <Signout/>
    <Row>
      <CSSTransition
        in={layout === ChatLayout.FIXED}
        timeout={500}
        unmountOnExit
        classNames='fade'>
        <Col className="d-xs-none p-0" md="3" lg="4">
          <FloatingChat display={[ChatLayout.FIXED]}/>
        </Col>
      </CSSTransition>
      <Col >
        <Switch>
          <Route exact path={`${path}/cv`}>
            <CV/>
          </Route>
          <Route exact path={path}>
            plop
          </Route>
        </Switch>
      </Col>
    </Row>
  </Container>
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  layout: selectChatLayout(state)
})

export default connect(mapStateToProps)(Home)