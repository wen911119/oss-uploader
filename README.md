### 使用

该镜像需要以下环境变量
1. region（oss的region）
2. accessKeyId（阿里云账户的accessKeyId,有权限访问oss的账户都可以）
3. accessKeySecret（阿里云账户的accessKeySecret）
4. bucket（阿里云oss的bucket名字）

其它可选环境变量
1. targetDir（oss的bucket里目录的名字，默认/代表根目录。如果要传到demo文件夹下，可以写/demo/）
