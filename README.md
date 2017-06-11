# clarissa
Example realtime React + Node Twttr app

server:
* (start any rethink db) //if no DB started, tweets are handled in-memory
* npm install
* npm start (runs on 3001)
* npm run lint //linting
* npm run test //tests


app:
* npm install
* npm start (runs on 3000) //dev mode
* npm run lint //linting

 Login with any user name, password must be 'summit' atm
 
 Features:
 * get tweets + pagination
 * create tweet
 * tweet streaming (using server sent events and rethink DB)
 * simple etag header for cache control
 * validation + error handling
 * location header and link header (pagination, HATEOAS)
 * logging
 * simple rate limiting (using restify's throttling)
 * CORS
 * API versioning
 * get single tweet ("detail mode")

 