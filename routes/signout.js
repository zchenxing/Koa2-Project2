
const router = require('koa-router')();


router.get('/signout', async(ctx, next) => {
    
    ctx.session = null;
    console.log('登出成功')
    console.log(ctx.session);
    ctx.body = true;

})
module.exports = router