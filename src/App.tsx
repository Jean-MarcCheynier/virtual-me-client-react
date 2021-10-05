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



function App() {
  
  const location = useLocation()
  
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
            <Route exact path="/:lang"><Redirect to="/:lang/home"/></Route>
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
