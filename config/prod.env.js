'use strict'
const target = process.env.MODE;
var obj;
if (target == 'product') {
    obj = {
        NODE_ENV: '"production"',
        URL: JSON.stringify({
            mobile: 'https://xpeng90.zwjk.com',
        })
    }
} else if (target == 'pre') {
    obj = {
        NODE_ENV: '"production"',
        URL: JSON.stringify({
            mobile: 'https://xpeng90.zwjk.com',
        })
    }
} else if (target == 'test') {
    obj = {
        NODE_ENV: '"production"',
        URL: JSON.stringify({
            mobile: 'https://paydownload-test.zwjk.com',
        })
    }
} else if (target == 'dev') {
    obj = {
        NODE_ENV: '"production"',
        URL: JSON.stringify({
            mobile: '/api',
        })
    }
}

module.exports = obj