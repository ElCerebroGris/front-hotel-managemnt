# Dockerfile
FROM node:14.16.0 as node

WORKDIR /app
COPY . .

# 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
# de5cd6ec-f997-40a0-8610-212dbab121ed
# Add nginx config
# COPY ./docker/nginx/nginx.conf /temp/nginx.conf
# RUN envsubst /app < /temp/nginx.conf > /etc/nginx/conf.d/default.conf

RUN npm install
RUN npm run build


FROM nginx:alpine
COPY --from=node /app/dist/intranet /usr/share/nginx/html/


# Add nginx config
COPY ./docker/nginx/nginx.conf /temp/nginx.conf
RUN envsubst /app < /temp/nginx.conf > /etc/nginx/conf.d/default.conf
EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
