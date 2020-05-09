
const createDomFromString = function(domStr) {
  const div = document.createElement('div')
  div.innerHTML = domStr
  return div
}

class btnToLike {
  constructor () {
    this.state = {
      isLike: false
    }
  }

  setState(state) {
    const oldEl = this.el
    this.state = state
    // 状态改变重新渲染
    this.el = this.render()
    // onStateChange是实例化后设置的方法，作用是移除旧的dom，插入新的dom
    if (this.onStateChange) this.onStateChange(oldEl, this.el)
  }

  changeLikeText() {
    // const likeText = this.el.querySelector('.like-text')
    this.setState({
      isLike: !this.state.isLike
    })
    // this.state.isLike = !this.state.isLike
    // likeText.innerHTML = this.state.isLike? '取消' : '点赞'
  }

  render() {
    this.el = createDomFromString(`
      <button class='like-button'>
        <span class='like-text'>${this.state.isLike? '取消' : '点赞'}</span>
        <span>👍</span>
      </button>
    `)
    // 此处bind改变this指向 否则方法中的this在严格模式下为undefined，非严格模式为window
    this.el.addEventListener('click', this.changeLikeText.bind(this), false)
    return this.el
  }
}

class Component {
  constructor(props = {}) {
    this.props = props
  }
  setState(state) {
    const oldEl = this.el
    this.state = state
    this._renderDom()
    if (this.onStateChange) this.onStateChange(oldEl, this.el)
  }

  _renderDom() {
    this.el = createDomFromString(this.render())
    if (this.onClick) {
      this.el.addEventListener('click', this.onClick.bind(this), false)
    }
    return this.el
  }
}

class LikeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLike: false
    }
  }
  render() {
    return `
      <button class='like-button' style='background-color: ${this.props.bgColor}'>
        <span class='like-text'>${this.state.isLike? '取消' : '点赞'}</span>
        <span>👍</span>
      </button>
    `
  }

  onClick() {
    this.setState({
      isLike: !this.state.isLike
    })
  }

}

const mount = (component, wrapper) => {
  wrapper.appendChild(component._renderDom())
  component.onStateChange = function(oldEl, newEl) {
    wrapper.insertBefore(newEl, oldEl)
    wrapper.removeChild(oldEl)
  }
}

let lbtn = new LikeButton({bgColor: '#abcdef'})
let wrapper = document.querySelector('.like-box')
mount(lbtn. wrapper)