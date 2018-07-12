import React, { Component } from 'react';
import { connect } from 'dva';
import Login from './todos'

class IndexPage extends Component {
  render() {
    return <Login />
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
