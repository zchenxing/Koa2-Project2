const router = require('koa-router')()
const userModel = require('../controller/taskDB')
const querystring = require('querystring');  


router.get('/posts/:page', async (ctx,next)=>{
    console.log('获取url ? 参数', querystring.parse(ctx.querystring))
    let postList = [], page = ctx.params.page;
    
    await userModel.findAllPost(page, 2).then(result => {
        postList = JSON.parse(JSON.stringify(result));       
    })

    await ctx.render('posts', {
        session: ctx.session,
        postList: postList
    })
})



router.get('/posts/list', async (ctx, next) => {

    // let postList = []    
    // let page = ctx.request.body.page;

    // await userModel.findAllPost(page, 2).then(result => {
    //     postList = JSON.parse(JSON.stringify(result));       
    // })

    await ctx.render('signin', {
        session: ctx.session
    })

    // ctx.body = true;
})


module.exports = router;

