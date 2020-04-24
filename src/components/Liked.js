import React, {Component} from 'react'

class LikeBtn extends Component {
  static defaultProps = {
    likedText: '取消',
    unlikedText: '点赞'
  }
  
  constructor() {
    super()
    this.state = {
      isLiked: false
    }
  }

  clickHandle() {
    this.setState({
      isLiked: !this.state.isLiked
      //setState 方法由父类 Component 所提供。当我们调用这个函数的时候，React.js 会更新组件的状态 state ，并且重新调用 render 方法，然后再把 render 方法所渲染的最新的内容显示到页面上。
      //它接受一个对象或者函数作为参数。
    })

    //使用函数最为参数，接受值为上一次的state
    // this.setState((prestate) => {
    //   return { count: 0 }
    // })
    // this.setState((prestate) => {
    //   return { count: prestate.count + 1 }
    // })
    // this.setState((prestate) => {
    //   return { count: prestate.count + 2 }
    // })
  }

  render() {
    const likedText = this.props.likedText
    const unlikedText = this.props.unlikedText
    return (
      <button onClick={this.clickHandle.bind(this)}>
        {this.state.isLiked? likedText : unlikedText}👍
      </button>
    )
  }
}

export default LikeBtn