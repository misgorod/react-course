FROM node
WORKDIR /app
COPY webpack.config.js package.json .babelrc ./
RUN npm install
COPY ./src /app/src
CMD [ "npm", "run", "start" ]
