FROM node:alpine 
ADD index.js index.js
ADD package.json package.json
RUN npm install 
CMD [ "node", "index.js" ]