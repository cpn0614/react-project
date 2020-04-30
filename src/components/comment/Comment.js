import React, {Component} from 'react'
import propTypes from 'prop-types'
import '../../assets/css/comment.less';

class Comment extends Component {
  constructor() {
    super()
    // let oldComment = sessionStorage.getItem('commentList')
    // let commentList = oldComment? JSON.parse(oldComment) : []
    this.state = {
      comments: []
    }
  }

  componentWillMount() {
    let oldComment = sessionStorage.getItem('commentList')
    let commentList = oldComment? JSON.parse(oldComment) : []
    this.setState({
      comments: commentList
    })
  }

  insertComment({username, content, time}) {
    console.log(username)
    let comments = this.state.comments
    comments.push({
      username,
      content,
      time
    })
    this.setState({
      comments
    })
  }

  deleteComment(index) {
    let comments = this.state.comments
    comments.splice(index, 1)
    sessionStorage.setItem('commentList', JSON.stringify(comments))
    this.setState({
      comments
    })
  }

  render() {
    return (
      <div className="comment">
        <CommentForm onSubmit={this.insertComment.bind(this)} />
        <CommentList comments={this.state.comments} onDelete={this.deleteComment.bind(this)} />
      </div>
    )
  }
}

class CommentForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      content: '',
      nameError: false,
      contentError: false
    }
  }

  componentWillMount() {
    sessionStorage.getItem('username') && this.setState({
      name: sessionStorage.getItem('username')
    })
  }

  componentDidMount() {
    if (this.state.name === '') this.input.focus()
    else this.content.focus()
  }

  postComment() {
    if (this.props.onSubmit) {
      const { name, content } = this.state
      // 姓名或内容为空不能提交
      if (this.state.nameError || this.state.contentError) return
      // 将数据存入sessionStorage中
      !!!sessionStorage.getItem('username') && sessionStorage.setItem('username', name)
      let oldComment = sessionStorage.getItem('commentList')
      let commentList = oldComment? JSON.parse(oldComment) : []
      let time = new Date()
      let text = this.getCode(content)
      commentList.push({ username: name, content: text, time: time })
      sessionStorage.setItem('commentList', JSON.stringify(commentList))
      this.props.onSubmit({username: name, content: text, time})
      this.setState({
        content: ''
        // name: ''
      })
    }
  }

  getCode(str) {
    let codes = str.match(/`.+?`/g)
    while(codes && codes.length >= 0) {
      let code = codes[0]
      str = str.split(code).join(`<code>${code.substring(1, code.length - 1)}</code>`)
      codes = str.match(/`.+?`/g)
    }
    return str
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleContentChange(event) {
    this.setState({
      content: event.target.value
    })
  }

  render() {
    return (
      <div className="form">
        <div className='form-item'>
          <span className="form-title">用户名：</span>
          <input
            type="text"
            ref={(input) => this.input = input}
            className={this.state.nameError? 'form-content error' :"form-content"}
            value={this.state.name}
            onBlur={() => this.state.name === ''? this.setState({nameError: true}) : this.setState({nameError: false})}
            onFocus={() => this.setState({nameError: false})}
            onChange={this.handleNameChange.bind(this)} />
        </div>
        <div className='form-item'>
          <span className="form-title">评论内容：</span>
          <textarea
            ref={(content) => this.content = content}
            className={this.state.contentError? 'form-content error' :"form-content"}
            value={this.state.content}
            onFocus={()=> this.setState({contentError: false})}
            onBlur={()=> this.state.content === ''? this.setState({contentError: true}) : this.setState({contentError: false})}
            onChange={this.handleContentChange.bind(this)} />
        </div>
        <div className="text-right"><button className="form-btn" onClick={this.postComment.bind(this)}>发布</button></div>
      </div>
    )
  }
}

class CommentList extends Component {
  static propsType = {
    comments: propTypes.array
  }

  deleteComment(index) {
    if (this.props.onDelete) {
      this.props.onDelete(index)
    }
  }

  render() {
    return (
      <div className="comment-list">
        {this.props.comments.length === 0?
          <div className="no-comment">暂无评论</div>
          :
          this.props.comments.map((comment, i) => <CommentContent key={i} index={i} comment={comment} onDelete={this.deleteComment.bind(this)} />)
        }
      </div>
    )
  }
}

class CommentContent extends Component {
  static propsType = {
    comment: propTypes.object.isRequired
  }
  constructor() {
    super()
    this.state = {
      timeLength: '0秒前'
    }
  }

  // comp`

  componentWillMount() {
    this.setState({
      timeLength:　this.calTime()
    })
    this.timer = setInterval(() => {
      this.setState({
        timeLength:　this.calTime()
      })
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  calTime() {
    const nowTime = new Date().getTime()
    const oldTime = new Date(this.props.comment.time).getTime()
    let length = parseInt((nowTime - oldTime) / 1000)
    let suffix = '秒'
    if (length < 60) {
      suffix = '秒'
    } else if (Math.floor(length / 60) < 60) {
      suffix = '分钟'
      length = Math.floor(length / 60)
    } else if (Math.floor(length / 60 / 24) < 24) {
      suffix = '小时'
      length = Math.floor(length / 60 / 24)
    } else if (Math.floor(length / 60 / 24 / 30) < 30) {
      suffix = '天'
      length = Math.floor(length / 60 / 24 / 30)
    } else {
      suffix = '很久'
      length = ''
    }

    return length + suffix + '前'
  }

  deleteItem() {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.index)
    }
  }

  render() {
    return (
      <div className="comment-item">
        <span className="item-name">{this.props.comment.username}</span>：
        <div className="item-content" dangerouslySetInnerHTML={{__html: this.props.comment.content}}></div>
        <div className="fr handle" onClick={this.deleteItem.bind(this)}>删除</div>
        <div className="clearfix">
          <div className="fr">{this.state.timeLength}</div>
        </div>
      </div>
    )
  }
}

export default Comment