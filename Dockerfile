# stage 1

FROM node:alpine AS movies-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY --from=movies-app-build /app/dist/movies-app /usr/share/nginx/html
EXPOSE 80
