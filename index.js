const region = process.env.region
let accessKeyId = process.env.accessKeyId
let accessKeySecret = process.env.accessKeySecret
const bucket = process.env.bucket
const targetDir = process.env.targetDir || '/'

if (region && accessKeyId && accessKeySecret && bucket) {
    accessKeyId = accessKeyId.split('').reverse().join('')
    accessKeySecret = accessKeySecret.split('').reverse().join('')
    const fs = require('fs');
    const OSS = require('ali-oss');
    const path = require('path');
    const co = require('co');
    const client = new OSS({
        region,
        accessKeyId,
        accessKeySecret,
        bucket
    });
    const basePath = path.resolve('./bundle')
    fs.readdir(basePath, function (err, files) {
        files.forEach(function (file) {
            console.log(basePath + '/' + file)
            co(function* () {
                var r1 = yield client.put(targetDir + file, basePath + '/' + file);
                console.log('put success: %j', r1);
            }).catch(function (err) {
                console.error('error: %j', err);
                throw new Error('upload oss fail !')
            });
        })
    })

} else {
    throw new Error('缺少必要环境变量！')
}


