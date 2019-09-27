import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import HomePg from './homepg';
import SrchPg from './searchpg';
import PokeDetail from './pokedetail';

export default class App extends React.Component {
  render(){
    return (
      <div className="app-container vh-100">
        <div className="app-holder container">
          <Router history={this.props.history}>
            <div className="logo-holder">
              <img src={process.env.PUBLIC_URL + '/logo.png'} alt="pokemon-logo" />
            </div>
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

/** 
 * 
 * 
 <Router history={this.props.history}>
        <Menu />
        <ScrollToTop>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/Home" component={Home}/>
              <Route path="/package/:id" component={PackageDescription}/>
              <Route path="/destdetail/:id" component={DestinationDetail} />
            <Route path="/ordersummary/:id" component={OrderManagement} />
          </Switch>
        </ScrollToTop>
        <Footer />
      </Router>
*/
