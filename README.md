# Run locally
docker-compose up

# Run db migrations
docker-compose run flyway -url=jdbc:postgresql://db:5432/compup -user=dbuser -password=password migrate
docker-compose restart server
