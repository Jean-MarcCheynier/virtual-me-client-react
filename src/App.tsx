import React from 'react';
import logo from './logo.svg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Counter } from './features/counter/Counter';
import Chat from './features/chat/Chat';
import Signin from './features/auth/Signin';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/signin">Signin</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/signin">
            <Signin/>
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
