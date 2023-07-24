FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json  yarn.lock ./

RUN yarn install 

COPY . .

RUN yarn build
EXPOSE 3000

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]