import React from 'react';
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import HomePage from './homepage';

export default class App extends React.Component {
  render(){
    return (
      <div className="app-container container">
        <div className="logo-holder">
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt="pokemon-logo" />
        </div>
        <HomePage />
      </div>
    );
  }
}

/** 
 * 
 * <Router history={this.props.history}>
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
