FROM node:14-alpine

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

WORKDIR /app
COPY package*.json ./
COPY .npmrc .
RUN npm install --only=prod

COPY . .

RUN npm run build \
    && rm -rf src/ \
    && rm -rf tsconfig.* \
    && rm -rf .npmrc \
    && rm -rf package-lock.json

CMD [ "npm", "start" ]
