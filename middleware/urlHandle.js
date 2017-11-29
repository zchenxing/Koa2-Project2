
let url_handle = async( ctx, next ) => {
    await next();
}


module.exports = url_handle;