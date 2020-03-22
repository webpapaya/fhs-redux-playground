# Run locally
docker-compose up
npm start
# go to: http://localhost:8081/

# Run db migrations
docker-compose run flyway -url=jdbc:postgresql://db:5432/compup -user=dbuser -password=password migrate
docker-compose restart server
