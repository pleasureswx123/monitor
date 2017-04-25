# test dispatch 埋点

根据dispatch - > action 中的参数 tag 进行埋点


## 安装

```bash
npm i monitortag --save
```


## 使用

```js
import monitor from 'monitortag'
```


### 在中间件中使用

```js
let store = createStore(
        combineReducers(reducers),
        preloadedState,
        applyMiddleware(thunkMiddleware,monitor()),
    )
```

### 在页面中走action形式，type固定 `@@monitor`，如：

```js
function fetchMonitor(ev){
    let target = ev.target;
    let actionTag = target.getAttribute('data-monitor');
    if(target.tagName === 'A' && actionTag){
        this.props.dispatch({
            type:'@@monitor',
            data:{
                actionTag
            }
        })
    }
}
```


## License

ISC
