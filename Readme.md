**The Meaning of File Structure**
#### Service
Dealing with querying the database and getting the response
if there is any error while getting the response it will throw it
#### validators
I user It to validate the data before sending it to the database
#### controllers
It first calls the validator that the service
#### database
connecting with the database
#### routes
createing a route and returning it
#### dependency injection
using dependency injection to creating the router in order to return it to the app so
that app can use it
#### index.js