import React, { Component } from 'react'
import Wraper from './HigherOrder'

class InputContent extends Component {
  render() {
    return <input value={this.props.data} />
  }
}

InputContent = Wraper(InputContent, 'content')
export default InputContent