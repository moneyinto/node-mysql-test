###node+mysql+express 搭建工程

***原先在Ubuntu环境下开发，一直都是用node+mongodb+express，现在在Windows环境下，mongodb用起来不是很方便，于是选用mysql***

####GET START

#####1、安装[node](https://nodejs.org/en/download/)

#####2、安装[mysql](http://dev.mysql.com/downloads/mysql/)
如果是解压版直接解压，进入bin文件夹下，输入：
```
mysqld -install
```
安装完成后，启动mysql：
```
net start mysql
```

#####3、安装express
```
npm install -g express-generator
```

#####4、搭建工程目录
- config/： 存放数据库的配置文件
- controllers/： 存放路由文件
- public/： 存放image、css、js等文件
- routes/：存放路由文件路径
- views/： 存放视图文件或者说模版文件
- package.json： 存储着工程的信息及模块依赖
- app.js： 启动文件

<br>
首先写package.json文件工程的依赖:
```json
{
  "name": "test",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "body-parser": "~1.12.0",
    "cookie-parser": "~1.3.4",
    "debug": "~2.1.1",
    "express-session": "1.9.1",
    "ejs": "~2.3.1",
    "express": "~4.12.2",
    "morgan": "~1.5.1",
    "serve-favicon": "~2.2.0",
    "mysql": "2.0.0-alpha9"
  }
}
```
在终端执行安装依赖：
```shell
npm install
```


<br>
接着写app.js文件:
```javascript
var express = require('express');
var path = require('path');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
//var session = require('express-session');
var routes = require('./routes/index');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
```
***有关app.js中的详细内容，参见[一个简单的博客](https://github.com/nswbmw/N-blog/wiki/%E7%AC%AC1%E7%AB%A0--%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84%E5%8D%9A%E5%AE%A2)***

<br>
再下来写路由，在routes中新建index.js：
```javascript
module.exports = function(app) {

    //index
    require('../controllers/indexController.js')(app);

};
```
在controllers中新建indexController.js：
```javascript
var db = require('../config/config.js');  //调用连接数据库mysql

var indexController = function (app) {
    app.get('/', function(req, res) {
        db.query('select name from user where id = 1', function (error, response) {
            if (error) console.log(error);
            console.log(response)
            res.render('index', {
                title: 'Express',
                myName: response[0].name
            });
        })
    });
};

module.exports = indexController;
```

<br>
然后配置数据库，在config中新建config.js：
```javascript
var mysql = require('mysql');

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'test',
    port: 3306
});
```

<br>
最后，我们在views中新建一个index.ejs来试试效果:
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title><%= title %></title>
</head>
<body>
	<div><%= myName %></div>
</body>
</html>
```

在终端中输入：
```shell
node app.js
```
![](http://7sbq8w.com1.z0.glb.clouddn.com/node-mysql-test.png)

