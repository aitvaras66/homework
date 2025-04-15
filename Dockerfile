# Use the official Playwright Docker image
FROM mcr.microsoft.com/playwright:v1.39.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Install Playwright dependencies
RUN npx playwright install --with-deps

# Default command to run tests
CMD ["npx", "playwright", "test"]