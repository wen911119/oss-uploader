### 使用

该镜像需要以下环境变量
1. region（oss的region）
2. accessKeyId（阿里云账户的accessKeyId,有权限访问oss的账户都可以）
3. accessKeySecret（阿里云账户的accessKeySecret）
4. bucket（阿里云oss的bucket名字）

其它可选环境变量
1. targetDir（oss的bucket里目录的名字，默认/代表根目录。如果要传到demo文件夹下，可以写/demo/）

### 环境变量设置方式

在gitlab内有个Secret variables。推荐这种方式。

### dockerfile内多阶段构建使用方式参考
```dockerfile
# 第一阶段npm-build
FROM wen911119/node-alpine-with-cnpm AS npm-builder
ADD /src /root/src
ADD package.json /root

WORKDIR /root

ARG BUILD_TARGET=dev

RUN cnpm install
RUN npm run build:${BUILD_TARGET}

# 第二阶段上传
FROM wen911119/fk-oss-uploader:latest
COPY --from=npm-builder /root/static/bundle /root/bundle
WORKDIR /root
RUN ls
RUN ./upload.sh
```