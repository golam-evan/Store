import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Customers } from './components/Customers';
import { Sales } from './components/Sales';
import { Stores } from './components/Stores';
import { Products } from './components/Products';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/Customers' component={Customers} />
            <Route path='/Sales' component={Sales} />
            <Route path='/Stores' component={Stores} />
            <Route path='/Products' component={Products} />

      </Layout>
    );
  }
}
