<p align="center">
  <a href="http://tibialabs.com/" target="blank"><img src="htthttps://i.imgur.com/9jP3lNK.png" alt="TibiaLabs Logo" /></a>
</p>

  <p align="center">TibiaLabs API v3 written in <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> using <a href="https://nestjs.com/" target="_blank">NestJS</a> as framework.</p>

## Project setup

```bash
$ pnpm install
$ pnpm prisma generate
```

### MongoDB

You'll need a MongoDB cluster for saving boosted bosses/creatures, you can get one for free on <a href="https://www.mongodb.com/atlas" target="_blank">MongoDB Atlas</a>, after generating it just update your .env with the following pattern:

```env
DATABASE_URL="mongodb+srv://DB_USER:DB_PASSWORD@DB_URL/entries?retryWrites=true&w=majority&appName=CLUSTER_NAME"
NODE_ENV=development
```

### Local development

```bash
$ pnpm run start:dev
```

### Production

```bash
$ pnpm run start:prod
```

## Deployment

This project is being deployed to <a href="https://railway.com?referralCode=rbrq0f" target="_blank">Railway</a>, however you can deploy this project to any place you like, just use the `Dockerfile` as base.

## API Documentation

Swagger documentation can be found <a href="https://docs.tibialabs.com" target="_blank">here.</a>

### Avaiable endpoints

- GET `/v3/character/info/:name`
- GET `/v3/character/sharelevel/:level`
- GET `/v3/guild/info/:name`
- GET `/v3/world/info/:name`
- GET `/v3/boosted/creature`
- GET `/v3/boosted/creature/name`
- GET `/v3/boosted/creature/list`
- GET `/v3/boosted/boss`
- GET `/v3/boosted/boss/name`
- GET `/v3/boosted/boss/list`
- GET `/v3/misc/rashid`
- GET `/v3/misc/rashid/city`

## Credits

- Author: [Lucas Hames](https://github.com/wedz0ff)
- Distributed under [MIT License](LICENSE)
