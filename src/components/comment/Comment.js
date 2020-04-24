import React, {Component} from 'react'
import '../../assets/css/comment.css';

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
      <div>
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
      content: ''
    }
  }

  postComment() {
    if (this.props.onSubmit) {
      const { name, content } = this.state
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
          <span>用户名：</span>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange.bind(this)} />
        </div>
        <div className='form-item'>
          <span>评论内容：</span>
          <textarea
            value={this.state.content}
            onChange={this.handleContentChange.bind(this)} />
        </div>
        <div><button onClick={this.postComment.bind(this)}>发布</button></div>
      </div>
    )
  }
}

class CommentList extends Component {
  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) => <CommentContent key={i} comment={comment} />)}
      </div>
    )
  }
}

class CommentContent extends Component {
  render() {
    return (
      <div>
        <span>{this.props.comment.username}</span>
        <div>{this.props.comment.content}</div>
      </div>
    )
  }
}

export default Comment