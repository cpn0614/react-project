## 一、前端方法、技巧总结 #
#### 1.复制文本到剪切板 ####

```javascript
@param String str 
@returns void
const copyToClipboard = (str) => {
  let save = function (e) {
    e.clipboardData.setData('text/plain', str);
    e.preventDefault();
  }
  document.addEventListener('copy', save);
  document.execCommand('copy');
  document.removeEventListener('copy', save);
  Message.success('已复制到剪贴板');  //this.$('copyClipboard')
}
```

#### 2.时间处理

	1.new Date().toLocaleDateString()
	  结果：2019/8/20
	2.new Date().toLocaleString('zh-CN', {hour12: false})
	  结果：2019/8/20 10:46:45

#### 3.join

	1.new Date().toLocaleDateString().split('/').join('-')
	  结果：2019-8-20

#### 4.文字不换行

```css
white-space: nowrap;
// 文本溢出显示省略号
text-overflow: ellipsis;
// 溢出的部分隐藏
overflow: hidden;
```
#### 5.生产模式下的请求添加标记参数
	如： t: new Date().toString()
	避免同一时间的同一请求只有一个发出去

#### 6.input placeholder属性的样式修改
```css
input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #aab2bd;
    /* placeholder字体大小  */
    font-size: 12px;
    /* placeholder位置  */
    text-align: right;
}
兼容写法
input::-webkit-input-placeholder { color:#f00; }
input::-moz-placeholder { color:#f00; } / firefox 19+ /
input:-ms-input-placeholder { color:#f00; } / ie /
input:-moz-placeholder { color:#f00; }
```

#### 7. 通过css写三角形
```css
span:before {
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;//透明
    border-left: 7px solid #ccc;
}
```

#### 8. 浏览器地址栏中文转码

```javascript
decodeURIComponent(window.location.href.split('#')[1])//中文锚点
```

#### 9. 倒叙输出字符串

``````javascript
let str = 'abcdefg'
let reverseStr = str.spilit('').reverse().join('')
``````

#### 10. 数组去重

``` javascript
let arrs = [1,1,3,4,4]
let arr = Array.from(new Set(arrs)) //[1,3,4]
```



## 二、Object对象 ##

#### 1.Object.keys(obj) ####
	1. 参数obj： 需要返回自身属性的对象
	2. 返回值： 给定对象的所有可枚举属性的字符串数组
	3. 例： 
		var arr = ['a', 'b', 'c'];
		console.log(Object.keys(arr)); // console: ['0', '1', '2']
	
		var obj = { 0: 'a', 1: 'b', 2: 'c' };
		console.log(Object.keys(obj)); // console: ['0', '1', '2']

#### 2. Object.assign(target, source) ####
用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

	1. 参数target：复制到的对象（目标对象）
	2. 参数source：被复制的对象（源对象）
	3. 返回值：目标对象
	4. 例： 
		const obj = { a: 1 };
		const copy = Object.assign({}, obj);
		console.log(copy); // { a: 1 }

## 三、Array数组 ##
#### 1.Array.filter(callback(element[, index[, array]])[, thisArg])####
创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
	
	1.参数callback:用于测试的函数，通过则返回，不通过则过滤
		a.element： 数组中当前正在处理的元素。 值
		b.index： 可选 正在处理的元素在数组中的索引。 索引
		c.array： 可选 调用了 filter 的数组本身。 数组本身
	2.参数thisArg： 可选 执行 callback 时，用于 this 的值。
	3.返回值： 一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。

#### 2. map
创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
	

	1.参数如filter
	2.返回值： 一个新数组，每个元素都是回调函数的结果。

#### 3. shift()
从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。如果数组为空则返回undefined

这个方法能够通过 call 或 apply 方法作用于类似数组的对象上。

unshift()添加

#### 4. contat()

连接两个或多个数组，并返回结果





## 四、常见问题 ##
#### 1. 浏览器报 `net::ERR_BLOCKED_BY_CLIENT`
原因：资源被浏览器中的广告插件拦截 

#### 2. 使用position + translate 居中，页面出现模糊
原因: 在`translate(-50%, -50%)`时，出现了小数

解决方法: `translate(calc(0.5px - 50%), calc(0.5px - 50%))`  

#### 3. 双核浏览器指定默认渲染方式

```html
<meta name="renderer" content="webkit">//默认webkit内核
<meta name="renderer" content="ie-comp">//默认IE兼容模式
<meta name="renderer" content="ie-stand">//默认IE标准模式
```

#### 4. cross-env: Permission denied

在服务器上运行`npm run build` 或 `npm run dev` 报`cross-env: Permission denied`、`nodemon: Permission denied`等错误，

运行`npm rebuild` 后再运行就行了

#### 5. 查找插入 sql

```sql
 INSERT INTO common_vphone(uid,phone,country_code)
 SELECT c.uid,c.mobile,86 FROM common_member_profile c
 
```

## 五、正则表达式 ##
#### 1. 不区分大小写i ####
	例： /test/i.test("Test")   //true
#### 2. 匹配多个| ####
	例： /dog|cat|fish/.test('i have a fish')    //true
#### 3. 提取匹配项.match() ####
	例：'my dog like play with dog'.match(/dog/)    //["dog"]  提取一次
		'my dog like play with dog'.match(/dog/g)    //["dog"， "dog"]  提取多次  /g 全局匹配
#### 4. 通配符. ####
	例：'i like listen music'.match(/li./g)    //['like', listen]
		/.un/.test('Coding is a lot of fun.')    //true
#### 5. 匹配字符集[字符] ####
	例：'abq, aqq, afv, aqs, afq'.match(/a[bqf]q/g)   //["abq", "aqq", "afq"]
#### 6. 匹配字母数字[a-z0-9] ####
	例： "The quick brown fox jumps over the lazy dog.".match(/[a-z]/ig)  //["T", "h", "e", "q", "u", "i", "c", "k", "b", "r", "o", "w", "n", "f", "o", "x", "j", "u", "m", "p", "s", "o", "v", "e", "r", "t", "h", "e", "l", "a", "z", "y", "d", "o", "g"]
		 "Blueberry 3.141592653s are delicious.".match(/[a-z0-1]/g)   // ["l", "u", "e", "b", "e", "r", "r", "y", "1", "1", "s", "a", "r", "e", "d", "e", "l", "i", "c", "i", "o", "u", "s"]
#### 7. 匹配未指定[^1-9] ####
	例: "3 blind mice.".match(/[^1-9. ]/ig)   //["b", "l", "i", "n", "d", "m", "i", "c", "e"]
#### 8. 匹配出现一次或多次的字符+ ####
	例: "Missisipsssspi".match(/s+/g)    //["ss", "s", "ssss"] 注：必须连续
#### 9. 匹配出现零次或多次的字符* ####
	例："Aaaaaaaaaaaaaaaarrrgh".match(/Aa*/)  

## 六、写法规范 ##
#### 1. 页面大样式规范 ####
##### 1） 字体
​	a. 字体大小有层级（如：从外到内依次减小字号）

​	b. 行高应与字体相差12px左右

##### 2)  代码规范
​	a. 减少重复代码，尽量复用

​	b. css中尽量减少 !important的使用

​	c. 涉及到金额的数字应保留两位

​	d. 图片尽量按比例缩放

​	e. 输入框提交时应去除前后空格trim()

##### 3) 使用优化
​	a. 按钮绑定enter事件

​	b. 表单最后一个输入框绑定enter事件

​	c. 模态框可以绑定esc事件

​	d. 图标操作hover 透明度变化（默认0.8透明，hover后1），title提示，鼠标变手型

​	e. 除非特别说明，列表的默认排序，根据添加时间， 降序排列

​	f. 单选框默认选中最常用项，复选框可不选

​	g. 搜索框中，空格不应作为关键字

##### 4) 页面优化

​	a. 页面保证对齐、对称

​	b. 表格最后一列右侧不应过多留白

​	c. 弹窗的内容与框的间距，应该是上下左右都均匀的，比如15PX

​	d. 加载数据时应有加载中动画，尽量使用异步加载

​	e. 统一部分使用的字体图标大小应尽量一致

​	




## 七、知识 ##
#### 1. js数据类型
Boolean,Null,Undefined,Number,String, 和Symbol（ES6 新增）和一种可变的数据类型：Object。
数组本质上是一种对象。

#### 2. 行内块元素
两个行内块元素在一起默认是基线对齐，可以通过vertical-align进行设置

#### 3. JS中的true和false

| 值类型    | 转换成布尔值                         |
| --------- | :----------------------------------- |
| undefined | false                                |
| null      | false                                |
| 布尔值    | true为true，false为false             |
| 数字      | +0，-0，NaN都是false，其余为true     |
| 字符串    | 空字符串（长度为0）false，其余为true |
| 对象      | true                                 |



## 八、VUE中的内容

#### 1.  Mixin 混入

1.  分发 Vue 组件中的可复用功能 
2.  一个混入对象可以包含任意组件选项
3. 选项合并：
   - 数据冲突时，以组件数据优先
   - 同名钩子函数合并为一个数组，混入对象的钩子函数先调用
   -  `methods`、`components` 和 `directives`  对象键名冲突时，取组件对象的键值对
4. 全局混入 将影响**每一个**之后创建的 Vue 实例 

#### 2.vuex

	1. state、getter、mutations、actions
 	2. dispatch和commit
      	1. dispatch: 含异步操作，如向后台提交数据 this.$store.dispatch('actions方法名', 值)
      	2. commit：同步操作   this.$store.commit('mutations方法名', 值)



## 九、 NUXT

#### 1. 搭建

1. 安装node.js

2. 将npm、node 添加到全局：

   ```
   /usr/local/nodejs/bin/node /usr/local/bin/node
   /usr/local/nodejs/bin/npm /usr/local/bin/npm3.
   ```

3. 本地打包nuxt

4. 将.nuxt、server文件夹上传至服务器

5. 将nuxt.config.js、package.json上传至服务器

6. 进入文件目录 运行`npm install`

7. `npm start`    (start配置为：`cross-env NODE_ENV=production node server/index.js`)

8. 执行 `pm2 start npm -- start`

   
   
   ### 十、 GIT
   
   1. 切换远程仓库： 先删后加
   
      ```
      git remote rm origin
      git remote add origin url
      git remote -v //查看
      ```
   
      
   
      
   
   

