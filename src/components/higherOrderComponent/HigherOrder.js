// 高阶组件
import React, { Component } from 'react'

export default (WrappedComponent, name) => {
  class NewComponent extends Component {
    constructor() {
      super()
      this.state = { data: null }
    }

    componentWillMount() {
      let data = localStorage.getItem(name)
      // 这里也可以改成ajax请求获取数据
      this.setState({data})
    }

    render() {
      return <WrappedComponent data={this.state.data} />
    }
  }
  return NewComponent
}