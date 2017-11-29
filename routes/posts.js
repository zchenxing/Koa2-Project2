const router = require('koa-router')()
const userModel = require('../controller/taskDB')
const querystring = require('querystring');  

/**
 * 文章列表，分页
 */
router.get('/posts', async (ctx,next)=>{
    
    console.log('获取url ? 参数', querystring.parse(ctx.querystring))

    let postList = [], 
        limit = 5
        totalPage = 0;
        params = querystring.parse(ctx.querystring)

    // 页数
    let page = params.page ? params.page : 1;

    // 查询文章总数，再换算成页数
    await userModel.findPostCount().then(val => {
        totalPage = Math.ceil((val[0].count)/limit);
    })

    // 按页查询数据
    await userModel.findAllPost(page, limit).then(result => {
        postList = result;       
    })

    await ctx.render('posts', {
        session: ctx.session,
        postList: postList,
        totalPage: totalPage,
        currentPage: page
    })
})


module.exports = router;

