import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Equipment from './pages/Equipment';
import Loadout from './pages/Loadout';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/Equipment" component={Equipment}/>
          <Route exact path="/Loadout" component={Loadout}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;





