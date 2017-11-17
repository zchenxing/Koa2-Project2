const query = require('../lib/mysql')


// 注册用户
let insertData = function (value) {
    let _sql = "insert into user(name, password) values(?, ?);"
    return query(_sql, value)
}


// 通过名字查找用户
let findDataByName = function (name) {
    let _sql = `select * from user where name="${name}";`
    return query(_sql)
}

// 查询所有标签
let findTag = function() {
    let _sql = `select * from tag`;
    return query(_sql)
}

// 发表文章
let insertPost = function (value) {
    let _sql = "insert into posts(title, content, u_id, t_id) values(?, ?, ?, ?);"
    return query(_sql, value)
}


// 更新浏览数
let updatePostPv = function (value) {
    let _sql = "update posts set pv=? where id=?"
    return query(_sql, value)
}


// 通过文章id查找
let findDataById = function (id) {
    let _sql = `SELECT * from posts where id="${id}"`
    return query(_sql)
}


// 查询所有文章
let findAllPost = function (page, limit) {
    let _sql = 
        `SELECT title, content, pv,tag_name, name, DATE_FORMAT(posts.create_date, '%Y-%c-%d %h:%i:%s') AS create_date
        FROM posts
        LEFT JOIN tag
        ON posts.t_id=tag.id
        LEFT JOIN user
        ON posts.u_id=user.id
        ORDER BY posts.create_date DESC
        LIMIT ${(page-1)*limit}, ${limit};`
    return query(_sql)
}


// 更新修改文章
let updatePost = function (values) {
    let _sql = `update posts set title=?, content=? where id=?`
    return query(_sql, values)
}


// 删除文章
let deletePost = function (id) {
    let _sql = `delete from posts where id = ${id}`
    return query(_sql)
}



module.exports = {
    insertData,
    findDataByName,
    insertPost,
    updatePostPv,
    findDataById,
    findTag,
    findAllPost,
    updatePost,
    deletePost
}