import React, {Component} from 'react'
import '../../assets/css/comment.less';

class Comment extends Component {
  constructor() {
    super()
    this.state = {
      comments: []
    }
  }

  insertComment({username, content}) {
    console.log(username)
    let comments = this.state.comments
    comments.push({
      username,
      content
    })
    this.setState({
      comments
    })
  }

  render() {
    return (
      <div className="comment">
        <CommentForm onSubmit={this.insertComment.bind(this)} />
        <CommentList comments={this.state.comments} />
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

  componentDidMount() {
    this.input.focus()
  }

  postComment() {
    if (this.props.onSubmit) {
      const { name, content } = this.state
      if (this.state.nameError || this.state.contentError) return
      this.props.onSubmit({username: name, content})
      this.setState({
        content: '',
        name: ''
      })
    }
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
            onBlur={()=> this.state.name === ''? this.setState({nameError: true}) : this.setState({nameError: false})}
            onFocus={()=> this.setState({nameError: false})}
            onChange={this.handleNameChange.bind(this)} />
        </div>
        <div className='form-item'>
          <span className="form-title">评论内容：</span>
          <textarea
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
  render() {
    return (
      <div className="comment-list">
        {this.props.comments.length === 0?
          <div className="no-comment">暂无评论</div>
          :
          this.props.comments.map((comment, i) => <CommentContent key={i} comment={comment} />)
        }
      </div>
    )
  }
}

class CommentContent extends Component {
  render() {
    return (
      <div className="comment-item">
        <span className="item-name">{this.props.comment.username}</span>：
        <div className="item-content">{this.props.comment.content}</div>
      </div>
    )
  }
}

export default Comment