# Use Node.js for building the React app
FROM node:20 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Debugging: Check if 'dist' actually exists
RUN ls -la /app/dist

# Use Nginx to serve the React app
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
