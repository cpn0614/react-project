// 通过this.props.children来访问传入组件中的jsx
// this.props.children得到的是一个数组


// dangerouslySetInnerHtml={{__html: this.state.content}}
// 类似于vue中的v-html


// 使用prop-types进行props参数校验
// import PropTypes from 'prop-types'
// static propTypes = {
//   comment: PropTypes.object
// }
// PropTypes.object.isRequired