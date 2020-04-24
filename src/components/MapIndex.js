import React, {Component} from 'react'

class Index extends Component {

  render() {
    // const ele = []
    // for (let user of this.props.users) {
    //   ele.push(
    //     <div>
    //       <span>{user.name}'s age is </span>
    //       <span>{user.age}</span>
    //     </div>
    //   )
    // }
    // return <div>{ ele }</div>
    return (
      <div>
        <span>{this.props.user.name}'s age is </span>
        <span>{this.props.user.age}</span>
      </div>
    )
  }
}

class Users extends Component {
  static defaultProps = {
    users: []
  }

  render() {
    return (
      <div>
        {this.props.users.map((user, index) => <Index key={index} user={user}/>)}
      </div>
    )
  }
}

export default Users