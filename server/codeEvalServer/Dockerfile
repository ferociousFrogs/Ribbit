#to build (run in the codeEvalServer folder): 
#docker build -t code_server .
#to debug in the codeEvalServer folder: 
#docker run -it -p 8080:8080 -v $(pwd):/src/app --name code_server --rm code_server
#to run in the codeEvalServer folder: 
#docker run -d -p 8080:8080 -v $(pwd):/src/app --name code_server --rm code_server
#or just run docker-compose up in Ribbit root
FROM node:7.6-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install

EXPOSE 8080

CMD [ "npm", "start" ]