FROM node:14-alpine

# Install curl
RUN apk add --no-cache curl

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Expose port and start app
EXPOSE 3000
CMD ["npm", "start"]