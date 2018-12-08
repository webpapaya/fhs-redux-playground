# Run locally
docker-compose up

# Run db migrations
docker-compose run flyway -url=jdbc:postgresql://db:5432/compup -user=dbuser -password=password migrate
docker-compose restart server

# Reproduce the issue
docker-compose down -v && docker-compose up -d && sleep 1 &&  docker-compose run flyway -url=jdbc:postgresql://db:5432/compup -user=dbuser -password=password migrate && docker-compose restart server && npm i && npm run test src/hola.spec.js