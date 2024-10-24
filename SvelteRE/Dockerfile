# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the SvelteKit application
RUN npm run build

# Expose the port the application will run on
EXPOSE 4173

# Command to start the production server
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]