const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const mount = require('koa-mount')
const static = require('koa-static')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const ejs = require('ejs')
const config = require('./config/default')
const mysql = require('./controller/createDB')
const session = require('koa-session-minimal')
const mysqlStore = require('koa-mysql-session')
const route = require('./routes/index');

const url_handle = require('./middleware/urlHandle')

const app = new Koa()

const sessionMysqlConfig = {
    user : config.database.USERNAME,
    password : config.database.PASSWORD,
    database : config.database.DATABASE,
    host : config.database.HOST
}

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())
app.use(logger())

app.use(session({
    key: 'USER_SID',
    store: new mysqlStore(sessionMysqlConfig)
}))

app.use(mount('/static', static(path.join(__dirname + '/public'))))
app.use(mount('/js', static(path.join(__dirname + '/js'))))
app.use(mount('/images', static(path.join(__dirname + '/images'))))


app.use(views(path.join(__dirname + '/views'), {
    extension: 'ejs'
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })


app.use(url_handle);

app.use(route.routes(), route.allowedMethods());


module.exports = app
