FROM node:alpine 
ADD index.js index.js
ADD upload.sh upload.sh
ADD package.json package.json
RUN npm install 
CMD [ "node", "index.js" ]