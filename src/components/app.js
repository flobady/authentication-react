import React, { Component } from 'react';
import Header from './Header';

export default class App extends Component {

  // on met this.props.children car on a nesté notre route signin dans app. les enfants sont donc passés en props aux parents.
  render() {
    return (
      <div>
        <Header />
        { this.props.children }
      </div>
    );
  }
}
