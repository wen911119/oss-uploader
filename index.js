const region = process.env.region
const accessKeyId = process.env.accessKeyId
const accessKeySecret = process.env.accessKeySecret
const bucket = process.env.bucket

if (region && accessKeyId && accessKeySecret && bucket) {
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
                var r1 = yield client.put('bundle/' + file, basePath + '/' + file);
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


