FROM node:20.10.0-alpine AS build

WORKDIR /Frontend

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend/. .

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /Frontend/dist /usr/share/nginx/html

#RUN rm /etc/nginx/conf.d/default.conf

#COPY --from=build /Frontend/nginx.conf /etc/nginx/nginx.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]