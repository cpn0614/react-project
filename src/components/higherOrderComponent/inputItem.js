import React, { Component } from 'react'
import Wraper from './HigherOrder'

class InputItem extends Component {
  render() {
    return <input value={this.props.data} />
  }
}
InputItem =  Wraper(InputItem, 'username')
export default InputItem