

## 测试

http://localhost:8080/

```bash
npm start
```

## 生成库 Monitortag 文件

```bash
npm run deploy
```


## 自动获取 uid cid
> uid  cid  必需
> 如没有获取到 不发请求

## 参数常见配置
> actionTag 埋点名称
> targetTag 扩展信息


## 传参 actionTag 有几种形式

- dom元素的属性 `data-monitor`
- send参数对象的属性 


### 在页面中其它地方直接发请求，不走action形式，actionTag 埋点名称 必需值，如：

```js
monitor.send({
    actionTag:'rqwrqrqrqrqwrqwr',  //埋点名称
    targetTag:{  //扩展信息
        name:123,
        age:4545
    }
});
```

### DOM元素bind事件使用，不走action

- 若参数 中有 actionTag 埋点名称，则无需要 target
- 若参数 中没有 actionTag 埋点名称，则通过 event.target 查其属性本身的 attr:'data-monitor'，若e.target没查找到，会向上逐层查找

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
    topic: 'web.action'，
    ipSrc:'http://pv.sohu.com/cityjson?ie=utf-8',
    ip:true
}
```
