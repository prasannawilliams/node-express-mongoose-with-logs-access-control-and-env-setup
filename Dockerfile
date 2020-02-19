FROM node:10.10.0

# Create app directory
WORKDIR /usr/src/app2
COPY . .

# Install app  dependencies

RUN npm install
RUN rm -rf .git

EXPOSE 4000
CMD [ "npm", "start" ]