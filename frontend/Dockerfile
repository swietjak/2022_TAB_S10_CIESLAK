FROM node:lts-slim AS builder
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile

COPY . /app
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

RUN chown -R nginx:nginx /usr/share/nginx/html/