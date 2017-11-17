let query = require('../lib/mysql')

// 创建数据库
createDatabase = 'CREATE DATABASE IF NOT EXISTS blog_system';

// 使用数据库
useSql = 'USE blog_system';

user =
    `CREATE TABLE IF NOT EXISTS user (
        id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        password VARCHAR(40) NOT NULL,
        create_date DATETIME DEFAULT now()
    )ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT="登录用户";`


tag =
    `CREATE TABLE IF NOT EXISTS tag (
        id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        tag_name VARCHAR(20) NOT NULL,
        create_date DATETIME DEFAULT now()
    )ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT="标签";`


posts =
    `CREATE TABLE IF NOT EXISTS posts (
        id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(40) NOT NULL,
        content TEXT NOT NULL,
        pv INT(10) NOT NULL COMMENT '浏览量',
        u_id INT(5) NOT NULL,
        t_id INT(3) NOT NULL,
        create_date DATETIME DEFAULT now(),
        update_date DATETIME DEFAULT now(),
        CONSTRAINT pos_use_fk FOREIGN KEY (u_id) REFERENCES user(id),
        CONSTRAINT pos_tag_fk FOREIGN KEY (t_id) REFERENCES tag(id)
    )ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT="文章"`


let exeSql = function(sql) {
    return query(sql, [])
}


// 建表
exeSql(createDatabase)
exeSql(useSql)
exeSql(user)
exeSql(tag)
exeSql(posts)

module.exports = exeSql;