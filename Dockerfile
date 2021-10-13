FROM node:14 as builder

WORKDIR /usr/local/app
ENV NODE_ENV=development

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
RUN yarn prisma generate
RUN yarn build

# -----

FROM node:14 as production

WORKDIR /usr/local/app
ENV NODE_ENV=production
ENV HOST=0.0.0.0

# required
# ENV IMGUR_CLIENT_ID="your-client-id"

# required for db seeding
RUN npm i -g typescript ts-node

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
COPY --from=builder /usr/local/app/dist /usr/local/app/dist
COPY --from=builder /usr/local/app/.nuxt /usr/local/app/.nuxt
RUN yarn prisma generate

# temporary database
ENV DATABASE_URL="file:production.db"
RUN yarn db:migrate
RUN yarn db:seed

CMD ["yarn", "start"]
