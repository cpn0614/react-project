import React, { Component } from 'react'
// import ReactDOM from 'react-dom'

class Header extends Component {
  // this.isHelpful = false
  handleClick(e) {
    console.log('you need change my value now!' + e.target.innerHTML)
    this.logMyWord('xixixi')
  }

  logMyWord(word) {
    console.log(word)
  }

  render() {
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
        <h1>hello world</h1>
      </div>
    )
  }
}

export default Header