const router = require('koa-router')()
const userModel = require('../controller/taskDB')
const md5 = require('md5')

router.get('/login', async(ctx, next) => {

    await ctx.render('login', {
        session: ctx.session
    })
})



router.post('/login', async(ctx, next) => {

    let name = ctx.request.body.name;
    let password = ctx.request.body.password;
    
    // 这里先查找用户名存在与否，存在则判断密码正确与否，不存在就返回false
    await userModel.findDataByName(name).then((result) => {

        if (name === result[0]['name'] && md5(password) === result[0]['password']) {
            ctx.body = true
            ctx.session.user = result[0]['name']
            ctx.session.id = result[0]['id']
        }
    }).catch(error => {
        ctx.body = 'false'
        console.log('用户名或密码错误!')
    })
})

module.exports = router;