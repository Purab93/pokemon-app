import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

import Menu from './menu';
import HomePg from './homepg';
import SrchPg from './searchpg';
import PokeDetail from './pokedetail';

/**
 * App class use for setting Routing in the APP
 */
export default class App extends React.Component {
  render(){
    return (
      <div className="app-container">
        <div className="app-holder container">
          <Router history={this.props.history}>
            <Menu />
            <Switch>
              <Route exact path="/" component={HomePg}/>
              <Route exact path="/srchpg" component={SrchPg}></Route>
              <Route exact path="/pokemon/:pokename" component={PokeDetail}/>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}