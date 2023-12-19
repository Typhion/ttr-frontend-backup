FROM node:20.10.0-alpine

WORKDIR /Frontend

# Install Git
RUN apk add --no-cache git

# Clone the Git repository
RUN git clone https://oauth2:glpat-1BTKAf79rafE9e4YVEZT@gitlab.com/kdg-ti/integratieproject-2/teams-23-24/team13/frontend

COPY frontend/frontend/package.json /Frontend/
RUN npm install

COPY ./frontend .

EXPOSE 5173
CMD ["npx", "vite", "--host"]

# docker build -t registry.gitlab.com/kdg-ti/integratieproject-2/teams-23-24/team13/frontend:1.0 .
# docker push registry.gitlab.com/kdg-ti/integratieproject-2/teams-23-24/team13/frontend:1.0