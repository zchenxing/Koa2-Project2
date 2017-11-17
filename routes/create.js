const router = require('koa-router')()
const userModel = require('../controller/taskDB')


router.get('/create', async (ctx, next) => {

    var res = {}

    await userModel.findTag().then(result => {
        res = JSON.parse(JSON.stringify(result)) 
    })  
    
    await ctx.render('create',{
        session:ctx.session,
        allTag: res	
    })
})


router.post('/create', async (ctx, next) => {

    let post = {
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        u_id: ctx.session.id,
        t_id: ctx.request.body.tag
    }

    await userModel.insertPost([
        post.title, post.content, post.u_id, post.t_id
    ]).then(result => {
        console.log(JSON.stringify(result));
        ctx.body = true;
    }).catch(error => {
        ctx.body = false;
    })
})

module.exports = router;