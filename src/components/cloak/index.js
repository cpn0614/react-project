import React, { Component } from 'react'

class Cloak extends Component {
  constructor() {
    super()
    this.state = {
      date: new Date()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 控制组件是否重新渲染，返回false则不重新渲染
    return true
  }

  componentWillReceiveProps(nextProps) {
    // 组件从父组件接收到新的props之前调用
  }

  componentWillUpdate() {
    // 组件开始渲染前调用
  }

  componentDidUpdate() {
    // 组件重新渲染并把改变渲染到dom之后调用
  }

  componentWillMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date()
      })
    })
  }

  render() {
    // style需要传入对象
    return (
      <h1>
        <p style={{color: '#aabbcc'}}>现在时间：</p>
        {this.state.date.toLocaleString()}
      </h1>
    )
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }
}

export default Cloak