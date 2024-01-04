FROM node:20.10.0-alpine AS builder

# Install Git
RUN apk add --no-cache git
RUN apk add --no-cache openssh

WORKDIR /Frontend

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend/. .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /Frontend/dist /usr/share/nginx/html
COPY --from=builder /Frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]

# docker build -t registry.gitlab.com/kdg-ti/integratieproject-2/teams-23-24/team13/frontend:1.0 .
# docker push registry.gitlab.com/kdg-ti/integratieproject-2/teams-23-24/team13/frontend:1.0