import React, { Component } from 'react';
import { connect } from 'dva';
import Todos from './todos'

class IndexPage extends Component {
  render() {
    return <Todos />
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
