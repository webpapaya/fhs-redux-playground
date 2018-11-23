# Run locally
docker-compose up

# Run db migrations
docker-compose run flyway -url=jdbc:postgresql://db:5432/compup -user=dbuser -password=password migrate
docker-compose restart server

Array.from({ length: 10000000 }).map((_, i) => fetch('http://localhost:3000/users', { method: 'POST', headers: {  'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ firstname: 'Sepp' + i, lastname: 'Huber' + i })}))


