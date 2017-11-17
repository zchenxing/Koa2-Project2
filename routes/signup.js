const router = require('koa-router')()
const userModel = require('../controller/taskDB')
const md5 = require('md5')

// GET '/signup' 注册页

router.get('/signup', async(ctx, next) => {
    await ctx.render('signup', {
        session: ctx.session
    })
})


/**
 * 注册用户
 */
router.post('/signup', async(ctx, next) => {
    let user = {
        name: ctx.request.body.name,
        password: ctx.request.body.password,
        repeatpass: ctx.request.body.repeatpass
    }

    // 通过名字查找用户
    await userModel.findDataByName(user.name).then(result => {

        // 用户已存在
        if (result.length) {
            try {
                throw Error('用户已存在')
            } catch (error) {
                console.log(error)
            }
            ctx.body = {
                data: 1,
                error: '用户名已存在'
            }
        } else if (user.password !== user.repeatpass || user.password == "") {
            ctx.body = {
                data: 2,
                error: '两次输入的密码不相同'
            }
        } else {
            ctx.body = {
                data: 3
            }
            console.log('注册成功')
            userModel.insertData([user.name, md5(user.password)])
        }
    })
})

module.exports = router;