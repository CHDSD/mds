## 前端开发常用工具介绍

### 1.chrome developer tools

首先最重要的谷歌浏览器的开发者工具，每个前端开发人员基本上离不开。类似的有firefox和ie的开发者工具，以及以前的firebug，但功能都没有chrome的开发者工具强大。

关于chrome开发者工具的使用，之前有同事分享的很详细了，这里就简单补充一下利用chrome开发者工具进行debug的方法。

>breakpoint, step over, step in, step out

![breakpoint][1]

如图所示，开发者工具切换到source标签，点击左边的行号设置或取消断点。或者可以在源码里面需要断点的地方前一行插入一行:
```js
debugger;
```

刷新页面后，代码会在断点位置停下来。此时如果想要resizeHeight继续往下执行, 可以点step over按钮。这里选择点击step in按钮，就会进入resizeHeight函数。

![step in][2]

接下来可以继续step over在函数内一步一步执行代码。如果想要立即执行完函数内的所有代码并跳出，可以点step out按钮，step out可以在step in进入被压缩的源码之后，快速跳出。

![step out][3]

在调试代码的过程中，可以通过右侧的面板查看代码的调用栈，当前作用域可访问的变量和对象的值等。


### 2.postman

日常前端开发中，离不开接口联调。有时候后台接口提供出来但前端业务逻辑还未写好，或者为了测试某一个接口需要在UI界面上多次重复一些交互的操作。可以使用postman来快速联调接口。
postman以前是作为chrome浏览器的扩展插件，最近单独发布成脱离chrome的桌面应用了，可以在官网下载 [https://www.getpostman.com/][u1]

![postman][4]

上图是用postman请求和风天气api的示例，postman的功能挺多的，红框中是一些常用的功能，可以设置请求类型，请求参数类型，自定义header等。

### 3.fiddler

在debug时，常常需要查看接口的响应，一般情况下可以使用chrome开发者工具的network面板。但假设下面的情况，某个页面收到某个请求后立即跳转或刷新了，根本来不及在network中查看返回详情；或者在移动端调试时，手机上发送的请求响应不好查看。遇到这种情况，就改fiddler登场了。

![fiddler][5]

上图的示例中，访问index.html时，表单提交到login接口后，经过两次302重定向，跳转到main.html了，在开发者工具的network中来不及查看login的响应，在fiddler中可以查看。fiddler还可以设置filter让你只看某个域名下的请求，调试的时候避免其他不相关请求的的干扰。关于fiddler查看移动端设备请求的方法，网上有很多教程，在这里就不细说了。

### webpack

在前端打包之前的时代，一个复杂的页面中可能引入几十个js和css文件。很多浏览器每个域名的最大并发请求数量只有6个，页面资源排队加载会页面打开时间长。
由于并发请求数量受限，随着前端项目的越来越复杂，前端工程师开始将css，js文件合并在一起。前端构建工具应运而生，其中的代表有grunt和gulp。grunt和gulp为提供了合并，压缩，编译less/sass，复制，打包等一系列任务。

webpack相对于grunt和gulp，提供了更好的对模块化的支持，结合babel可以直接使用es6语法，对于grunt和babel的常用任务也有对应的插件支持。再加上主流前端框架的推广，使得webpack成为现阶段最火的前端编译和构建工具。

下面就来看一个webpack打包项目的示例。

项目目录结构:

```
.
+-- dist
+-- src
|   +-- index.js
|   +-- moduleA.js
|   +-- moduleB.js
|   +-- moduleC.js
|
+-- index.html
```

源代码:
```js
// ==========index.js==========
import A from './moduleA';

var thing = {
  info: 'some work need to do',
  finish_percent: 0,
  done: false
};

A.dosomething(thing);

// ==========moduleA.js==========
import B from './moduleB';

export default {
  dosomething(thing) {
    B.dosomething(thing);

    thing.finish_percent += 50;    
    if (thing.finish_percent >= 100) {
      thing.done = true;
    }

    let stat = thing.done ? 'done' : 'unfinished';
    let re = `this is A, complete 50%, now ${thing.finish_percent}% percent, ${stat}.`;
    console.log(re);
    document.body.insertAdjacentHTML('beforeend', `<p>${re}</p>`);
  }
};

// ==========moduleB.js==========
import C from './moduleC';

export default {
  dosomething(thing) {
    C.dosomething(thing);

    thing.finish_percent += 20;    
    if (thing.finish_percent >= 100) {
      thing.done = true;
    }

    let stat = thing.done ? 'done' : 'unfinished';
    let re = `this is B, complete 20%, now ${thing.finish_percent}% percent, ${stat}.`;
    console.log(re);
    document.body.insertAdjacentHTML('beforeend', `<p>${re}</p>`);
  }
};

// ==========moduleC.js==========
export default {
  dosomething(thing) {
    thing.finish_percent += 30;
    if (thing.finish_percent >= 100) {
      thing.done = true;
    }

    let stat = thing.done ? 'done' : 'unfinished';
    let re = `this is C, complete 30%, now ${thing.finish_percent}% percent, ${stat}.`;
    console.log(re);
    document.body.insertAdjacentHTML('beforeend', `<p>${re}</p>`);
  }
};
```

webpack打包后的代码:

```js
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moduleA__ = __webpack_require__(2);


var thing = {
  info: 'some work need to do',
  finish_percent: 0,
  done: false
};

__WEBPACK_IMPORTED_MODULE_0__moduleA__["a" /* default */].dosomething(thing);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moduleB__ = __webpack_require__(3);


/* harmony default export */ __webpack_exports__["a"] = ({
  dosomething(thing) {
    __WEBPACK_IMPORTED_MODULE_0__moduleB__["a" /* default */].dosomething(thing);

    thing.finish_percent += 50;    
    if (thing.finish_percent >= 100) {
      thing.done = true;
    }

    let stat = thing.done ? 'done' : 'unfinished';
    let re = `this is A, complete 50%, now ${thing.finish_percent}% percent, ${stat}.`;
    console.log(re);
    document.body.insertAdjacentHTML('beforeend', `<p>${re}</p>`);
  }
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moduleC__ = __webpack_require__(4);


/* harmony default export */ __webpack_exports__["a"] = ({
  dosomething(thing) {
    __WEBPACK_IMPORTED_MODULE_0__moduleC__["a" /* default */].dosomething(thing);

    thing.finish_percent += 20;    
    if (thing.finish_percent >= 100) {
      thing.done = true;
    }

    let stat = thing.done ? 'done' : 'unfinished';
    let re = `this is B, complete 20%, now ${thing.finish_percent}% percent, ${stat}.`;
    console.log(re);
    document.body.insertAdjacentHTML('beforeend', `<p>${re}</p>`);
  }
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  dosomething(thing) {
    thing.finish_percent += 30;
    if (thing.finish_percent >= 100) {
      thing.done = true;
    }

    let stat = thing.done ? 'done' : 'unfinished';
    let re = `this is C, complete 30%, now ${thing.finish_percent}% percent, ${stat}.`;
    console.log(re);
    document.body.insertAdjacentHTML('beforeend', `<p>${re}</p>`);
  }
});



/***/ })
/******/ ]);
```


### nodejs

打开新世界的大门。nodej是一个javascript运行时，nodejs使得js可以脱离浏览器运行。借助nodejs，你可以随时运行一个js文件，可以操纵硬盘中的内容，可以发送网络请求。上面的grunt，gulp和webpack以及它们的各种插件，都依赖于nodejs运行。通过npm可以获取各种各样的包来帮助完成任务，还可以自己写一些工具发布到npm供别人使用。


### 其他

markman UI图测量尺寸，取色

nginx 根据项目后端环境，本地开发时配置各种代理

ps 切图，页面仔必备

shadowsocks google搜索更准确

teamviewer 远程连接，个人用户免费






[1]: img/171123-001.png
[2]: img/171123-002.jpg
[3]: img/171123-003.jpg
[4]: img/171123-004.jpg
[5]: img/171123-005.jpg

[u1]: https://www.getpostman.com/
