const router = require('koa-router')()
const userModel = require('../controller/taskDB')
const queryString = require('querystring')


router.get('/edit', async (ctx,next)=>{
    
    let params = queryString.parse(ctx.querystring);
    let posts = {}, res = {};

    await userModel.findDataById(params.id).then((post) => {
        posts = post[0];        
    })    

    // 获取tag标签，用于选择文章标签类型
    await userModel.findTag().then(result => {
        res = JSON.parse(JSON.stringify(result)) 
    })  

    await ctx.render('create',{
        session: ctx.session,   
        postsData: posts,
        allTag: res	
        
    })
})



router.put('/updatePosts', async (ctx, next) => {
    let params = queryString.parse(ctx.querystring);
    
    // let _sql = `UPDATE posts SET title=?, content=?, content_html=? t_id= ? WHERE id=?`
    let posts = {
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        content_html: ctx.request.body.content_html,
        t_id: ctx.request.body.tag
    }

    console.log(params.id)

    // ctx.body = false;
    await userModel.updatePost([
            posts.title, posts.content, posts.content_html, posts.t_id, params.id]).
        then(() => {
            ctx.body = true;
        }).catch(() => {
            ctx.body = false;            
        })

})


module.exports = router;
