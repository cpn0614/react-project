import React, { Component } from 'react'

import HigherOrder from './HigherOrder'
import AjaxWraper from './AjaxWraper'

class ManyWraper extends Component {
  render() {
    return <input value={this.props.data} />
  }
}
// 先从 LocalStorage 中加载数据，再用这个数据去服务器取数据。
// 从外到内
ManyWraper = AjaxWraper(ManyWraper)
ManyWraper =  HigherOrder(ManyWraper, 'username')
export default ManyWraper