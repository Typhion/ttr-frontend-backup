FROM node:20.10.0-alpine

WORKDIR /frontend

COPY /frontend/package.json .
RUN npm install

COPY ./frontend .

EXPOSE 5173
CMD ["npx", "vite"]