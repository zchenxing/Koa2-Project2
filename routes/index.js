const router = require('koa-router')()
const signup = require('./signup')
const signin = require('./signin')
const posts = require('./posts')
const signout = require('./signout')
const create = require('./create')
const preview = require('./preview')

const API = '/system';

router.get('/', async(ctx, next) => {
    ctx.redirect('system/signin');
})



router
    .use( API, signup.routes(), signup.allowedMethods() )
    .use( API, signin.routes(), signin.allowedMethods() )
    .use( API, posts.routes(), posts.allowedMethods() )
    .use( API, signout.routes(), signout.allowedMethods() )
    .use( API, create.routes(), create.allowedMethods() )
    .use( API, preview.routes(), preview.allowedMethods() )

module.exports = router;