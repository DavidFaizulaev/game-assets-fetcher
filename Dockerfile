FROM node:12-alpine

RUN mkdir -p /home/app/src
WORKDIR /home/app

# Copy working files
COPY src /home/app/src
COPY data /home/app/data
COPY node_modules /home/app/node_modules

# Copy package.json
COPY package.json /home/app/

# Run the js script
ENTRYPOINT ["node", "--max_old_space_size=256", "src/server.js"]