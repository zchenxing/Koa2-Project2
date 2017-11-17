
let url_handle = async( ctx, next ) => {
    console.log('中间件输出', ctx.request.body);
    console.log('中间件输出', ctx.url);

    let reg = new RegExp(/posts/);

    console.log(reg.test(ctx.url))

    await next();
}


module.exports = url_handle;