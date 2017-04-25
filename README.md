# test dispatch 埋点

根据dispatch - > action 中的参数 tag 进行埋点


## 安装

```bash
npm i monitortag --save
```

## 测试

http://localhost:8080/

```bash
npm start
```

## 生成库 Monitortag 文件

```bash
npm run deploy
```

## action.type
```bash
action.type = 'MONITOR_BEHAVIOR'

export function fetchMonitor(opt) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionType.MONITOR_BEHAVIOR,
            data: { ...opt }
        });
    };
}

```


## 使用

```js
import monitor from 'monitortag'
```

## 传参 actionTag 有几种形式

- dom元素的属性
- send参数对象的属性

### 在中间件中使用

```js
let store = createStore(
        combineReducers(reducers),
        preloadedState,
        applyMiddleware(thunkMiddleware,monitor()),
    )
```

### 在页面中其它地方使用

```js
monitor.send({
    actionTag:'rqwrqrqrqrqwrqwr',
    targetTag:{
        name:123,
        age:4545
    }
});
```

### DOM元素bind事件使用

```js
document.addEventListener('mousedown', function(e){
    app.send({
        target:e.target,
        targetTag:{}
    });
}, !1);
```

```js
document.addEventListener('mousedown', app.send, !1);
```

## 基本参数信息

```js
let basePars = (function(){
    let uuid = util.getUuid(),
        resolution = util.getScreenResolution(),
        os = util.getOs(),
        browser = util.getBrowser(),
        option = {
            uuid,
            resolution,
            puse: 'web_js'
        };
    extend(option, os, browser);
    return option;
})();
```

## 配置信息

`attr` 为 页面中设置 `actionTag` 参数的一种形式，还有一种在  `monitor.send` 方法 中增加属性

```js
{
    logImgSrc: '',
    // attr:'data-collect',
    attr: 'class',
    topic: 'web.action'
}
```

## License

ISC
