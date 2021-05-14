https://github.com/sidorares/node-mysql2

https://segmentfault.com/a/1190000023859152

```javascript
// https://github.com/sidorares/node-mysql2
const mysql = require('mysql2')

// create the connection to database
const pool = mysql.createPool({
    host: 'gz-cynosdbmysql-grp-0ccdjagn.sql.tencentcdb.com',
    user: 'root',
    password: '123456sbmP',
    database: 'eggjs',
    port: '20191',
}).promise()

;(async () => {
    const [rows, fields] = await pool.query(`select * from users limit 10`)
    console.log(rows)
})()
```