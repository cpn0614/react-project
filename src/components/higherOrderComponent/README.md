##　高阶组件  
高阶组件就是一个函数，传给它一个组件，返回一个新的组件   
如： `const NewComponent = higherOrderComponent(OldComponent)`

1. 一个简单的高阶组件   
   **高阶组件是一个函数**
  ```javascript
  export default (WrappedComponent) => {
    class NewComponent extends Component {
      render() {
        return <WrappedComponent />
      }
    }
    return NewComponent
  }
  ```

2. 实例
   文件HigherOrder.js中实现了一个高阶组件。通过获取localstorage中的某个值，赋值给传入的组件中。在inputContent.js和inputItem.js中调用了该高阶组件，实现了获取自定义的localstorage赋值给当前输入框。**复用了逻辑代码**

3. 目的  
   高阶组件的作用其实不言而喻，其实就是为了**组件之间的代码复用**。组件可能有着某些相同的逻辑，把这些逻辑抽离出来，放到高阶组件中进行复用。**高阶组件内部的包装组件和被包装组件之间通过 props 传递数据**。