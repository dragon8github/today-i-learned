https://miyogurt.github.io/nodelover-books/#/sequelize/document/8tabel2model

https://github.com/sequelize/sequelize-auto

```javascript
npm install -g sequelize-auto mysql
```

之所以安装 mysql 而不是 mysql2 是因为这个插件里面的 sequelize 还是3.x 版本。

```javascript
sequelize-auto -o "./models" -d nodelover -h 127.0.0.1 -u root -p 3306 -x '' -e mysql
```

- -d 是数据库名称 
- -e 是数据库类别 
- -x 是密码 
- -o 是输出地址