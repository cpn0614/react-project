import React, { Component } from 'react'
import PropType from 'prop-types'
import Header from '../components/Header'

class Index extends Component {
  static childContextTypes = {
    color: PropType.string
  }

  constructor () {
    super()
    this.state = {
      color: '#ccc'
    }
  }

  getChildContext() {
    // 在context中放置了color
    return { color: this.state.color }
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    )
  }
}

export default Index