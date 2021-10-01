import {
  useLocation,
  Switch,
  Route,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Signin from './features/auth/Signin';
import Landing from './features/home/Landing';
import Home from './features/home/Home';



function App() {
  
  const location = useLocation()
  
  return (
    <div>
      <TransitionGroup>
        <CSSTransition
          timeout={300}
          classNames='fade'
          key={"plop"}
        >
          <Switch location={location}>
            <Route path="/" exact={true} component={Landing} />
            <Route path="/home" component={Home} />
            <Route path="/signin" component={Signin} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
