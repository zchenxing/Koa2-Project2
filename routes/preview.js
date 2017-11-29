const router = require('koa-router')()
const userModel = require('../controller/taskDB')
const queryString = require('querystring')

router.get('/p', async(ctx, next) => {

    let params = queryString.parse(ctx.querystring);
    let posts = {};

    await userModel.findDataById(params.id).then((post) => {
        posts = post[0];        
    })    
    
    await ctx.render('preview', {
        session: ctx.session,
        postsData: posts
    })

})


module.exports = router;