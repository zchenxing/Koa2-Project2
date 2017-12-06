const query = require('../lib/mysql')


// 注册用户
let INSERTData = function (value) {
    let _sql = "INSERT INTO user(name, password) values(?, ?);"
    return query(_sql, value)
}


// 通过名字查找用户
let findDataByName = function (name) {
    let _sql = `SELECT * FROM user WHERE name="${name}";`
    return query(_sql)
}

// 查询所有标签
let findTag = function() {
    let _sql = `SELECT * FROM tag`;
    return query(_sql)
}

// 发表文章
let INSERTPost = function (value) {
    let _sql = "INSERT INTO posts(title, content, content_html, u_id, t_id) VALUES(?, ?, ?, ?, ?);"
    return query(_sql, value)
}


// 更新修改文章
let updatePost = function (values) {
    let _sql = `UPDATE posts SET title=?, content=?, content_html=?, t_id= ? WHERE id=?`
    return query(_sql, values)
}


// 更新浏览数
let updatePostPv = function (value) {
    let _sql = "update posts set pv=? WHERE id=?"
    return query(_sql, value)
}


// 通过文章id查找
let findDataById = function (id) {
    let _sql = `
        SELECT *,DATE_FORMAT(posts.create_date, '%Y-%m-%d %h:%m:%s') AS create_date
        FROM posts,tag 
        WHERE posts.u_id=tag.id 
        AND posts.id="${id}"`
    return query(_sql)
}


// 查询所有文章
let findAllPost = function (page, limit) {
    let _sql = 
        `SELECT posts.id, title, content, pv,tag_name, name, DATE_FORMAT(posts.create_date, '%Y-%m-%d') AS create_date
        FROM posts
        LEFT JOIN tag
        ON posts.t_id=tag.id
        LEFT JOIN user
        ON posts.u_id=user.id
        ORDER BY posts.create_date DESC
        LIMIT ${(page-1)*limit}, ${limit};`
    return query(_sql)
}

// 查询文章数
let findPostCount = function() {
    let _spl = `SELECT COUNT(*) AS count FROM posts`;
    return query(_spl)
}


// 删除文章
let deletePost = function (id) {
    
    let _sql = `DELETE FROM posts WHERE id = ${id}`
    return query(_sql)
}



module.exports = {
    INSERTData,
    findDataByName,
    INSERTPost,
    updatePostPv,
    findDataById,
    findTag,
    findPostCount,
    findAllPost,
    updatePost,
    deletePost
}