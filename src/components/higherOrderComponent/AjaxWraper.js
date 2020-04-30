// 高阶组件
import React, { Component } from 'react'

export default (WrappedComponent) => {
  class NewComponent extends Component {
    constructor() {
      super()
      this.state = { data: null }
    }

    componentWillMount() {
      // 用传入的data拼接为url去获取数据 即/user/this.props.data
      // 这里假装是一个ajax请求， 并获获取到了数据
      let data = {data: this.props.data}
      this.setState({data})
    }

    render() {
      return <WrappedComponent data={this.state.data} />
    }
  }
  return NewComponent
}