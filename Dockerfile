FROM node:alpine 
ADD index.js index.js
ADD package.json package.json
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install 
CMD [ "node", "index.js" ]