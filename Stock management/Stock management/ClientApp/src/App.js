import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Admin } from './components/products/admin';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Admin} />
            {/*<Route path='/create' component={Create} />*/}
      </Layout>
    );
  }
}
