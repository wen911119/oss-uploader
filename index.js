const region = process.env.region;
let accessKeyId = process.env.accessKeyId;
let accessKeySecret = process.env.accessKeySecret;
const bucket = process.env.bucket;
const targetDir = process.env.targetDir || "/";

if (region && accessKeyId && accessKeySecret && bucket) {
  const fs = require("fs");
  const OSS = require("ali-oss");
  const path = require("path");
  const client = new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    bucket
  });
  const basePath = path.resolve("./bundle");
  fs.readdir(basePath, function(err, files) {
    files.forEach(function(file) {
      console.log(basePath + "/" + file);
      client
        .put(targetDir + file, basePath + "/" + file)
        .then(result => {
          console.log("put success: %j", result);
        })
        .catch(error => {
          console.error("error: %j", error);
          throw new Error("upload oss fail !");
        });
    });
  });
} else {
  throw new Error("缺少必要环境变量！");
}
