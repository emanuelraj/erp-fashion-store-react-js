import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import Login from './login/login';
import Home from './home/home';
import Vendor from './vendor/vendor';
import ProductCatlog from './product-catlog/product-catlog';
import './App.css';

class App extends Component {
  render() {
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h1 className="App-title">Welcome to React</h1>
    //     </header>
    //     <p className="App-intro">
    //       To get started, edit <code>src/App.js</code> and save to reload.
    //     </p>
    //   </div>
    // );

    return (
      <Router>
         <div>            
            <Switch>
               <Route exact path='/home' component={Home} />
               <Route exact path='/' component={Login} />
               <Route exact path='/vendor' component={Vendor} />
               <Route exact path='/product-catlog' component={ProductCatlog} />
            </Switch>
         </div>
      </Router>
   );
  }
}

export default App;
