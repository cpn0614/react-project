import React, { Component } from 'react'
// import ReactDOM from 'react-dom'

class Header extends Component {
  constructor() {
    super()
    // console.log('constructor')
    this.state = {
      date: new Date()
    }
  }

  componentWillMount() {
    // render之前调用
    // Ajax 数据的拉取操作、一些定时器的启动放在这
    // console.log('dom 挂载前')
    setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  }

  componentDidMount() {
    // render之后调用
    console.log('dom 已挂载')
  }

  componentWillUnmount() {
    console.log('删除前')
  }

  // componentD

  // this.isHelpful = false
  handleClick(e) {
    console.log('you need change my value now!' + e.target.innerHTML)
    this.logMyWord('xixixi')
  }

  logMyWord(word) {
    console.log(word)
  }

  render() {
    console.log('dom render')
    const className = 'header'
    // label的for属性在jsx中需要用htmlfor代替
    let isHelpful = true
    const study = <p>该怎么学习react呢</p>
    const play = <p>该怎么玩耍呢</p>
    return (
      <div className={className}>
        {/* on的事件监听只能放在html标签上，组件标签上没用效果 
          同时 this不会指向方法中，而会打印出null或undefined，需要使用bind*/}
        <p onClick={this.handleClick.bind(this)}>react是{isHelpful
          ? '有用的'
          : '没用的' //null会忽略该表达式插入 可以做到隐藏、显示某些元素
        }</p>
        { !isHelpful ? study : play }
        <h1>
          <p>现在的时间是</p>
          {this.state.date.toLocaleString()}
        </h1>

      </div>
    )
  }
}

export default Header