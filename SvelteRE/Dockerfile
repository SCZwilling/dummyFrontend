# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the application will run on
EXPOSE 5173

# Command to start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]