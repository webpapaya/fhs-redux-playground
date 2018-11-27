# Run locally
docker-compose up

# Run db migrations
docker-compose run flyway -url=jdbc:postgresql://db:5432/compup -user=dbuser -password=password migrate
docker-compose restart server

# Some ideas to play around with this architecture:
- Add delete button next to each user in the user-list container (have a look on the event-list)
- Add a new component which lists for each user the corresponding events he participates in (or the other way around)
    - The component should automatically update whenever a event participation is added
- Modify the user-create that it can also handle updates
    - add update-user action/reducer
        - swagger docs are on http://localhost:8080
- Try to reducer boilerplate in actions/reducers

# TODOs:
- Add some documentation and guides
- Think about routing
    - I didn't like react-router in the last project to much
- Maybe move to formik/diskuss form handling
    - where to draw the line between client validations and server validations?
    - server needs to return all validations errors
- Better Input controlls
    - The IBAN input looses the cursor position
    - Maybe there is already a package (eg. input-mask)
- Error handling
    - Error boundries vs "expected errors"
- add tests to
    - hasSideEffect
    - when we don't move to formik add tests to the isForm HOC

# Discussion for backend
- API find a standardized way for crud oprations
- Maybe use something like https://jsonapi.org/ or even use http://postgrest.org/en/v5.1/
    - makes it easier to reduce boilerplate in action-creators/reducers
- How to handle resource embedding - do we even need this?