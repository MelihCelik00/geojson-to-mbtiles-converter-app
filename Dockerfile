# Use an official Node.js runtime as the base image
FROM node:16.19.0

# Install required packages
RUN apt-get update && \
    apt-get install -y git build-essential && \
    rm -rf /var/lib/apt/lists/*

# Clone the repository and build Tippecanoe
RUN git clone https://github.com/mapbox/tippecanoe.git && \
    cd tippecanoe && \
    make -j && \
    make install

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install tippecanoe
RUN npm install -g tippecanoe

# Copy the rest of the application code
COPY . .

# Run the command to execute your code when the container starts
CMD ["npm", "run", "local"]

# # Copy the script into the container
# COPY docker.sh /docker.sh

# # Make the script executable
# RUN chmod +x /docker.sh

# # Use the script as the entry point
# ENTRYPOINT ["/docker.sh"]
