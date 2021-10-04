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
          key={"plop"}
        >
          <Switch location={location}>
            <Route exact path={["/", "/:lang"]}><Redirect to="/en/home"/></Route>
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
