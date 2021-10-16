import React, { useEffect } from 'react';
import {
  useLocation,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Signin from './features/auth/Signin';
import Landing from './features/home/Landing';
import Home from './features/home/Home';
import { WebSocketContext } from "./features/ws/WebSocketProvider";



function App() {

  const location = useLocation()
  const ws: any = WebSocketContext;
  
  useEffect(() => {
    console.log("CONTEXT");
    if (ws && ws.socket) {
      console.log("init");
      ws.socket.on("changeLang", () => {
        console.log("langChanged");
        //console.log(params);
        console.log(location);
      });
    }

  }, [ws])
  
  return (
    <div lang="">
      <TransitionGroup>
        <CSSTransition
          timeout={300}
          classNames='fade'
          key={"id"}
        >
          <Switch location={location}>
            <Route exact path="/"><Redirect to="/en" /></Route>
            <Route exact path="/:lang" render={props => (
              <Redirect to={`/${props.match.params.lang}/home/`} />)} />
            <Route path="/:lang/landing" exact={true} component={Landing} />
            <Route path="/:lang/home" component={Home} />
            <Route path="/:lang/signin" component={Signin} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
