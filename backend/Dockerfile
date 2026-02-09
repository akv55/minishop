FROM node:18-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose the port used by the Express app
EXPOSE 5000

# Start the server
CMD ["node", "app.js"]
