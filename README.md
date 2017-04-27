# clarissa
Example realtime React + Node Twttr app

server:
* (start any rethink db) //if no DB started, tweets are handled in-memory
* yarn (or npm) install
* yarn (or npm) run server (runs on 3001)
* yarn (or npm) run lint //linting


app:
* yarn (or npm) install
* yarn (or npm) run dev (runs on 3000) //dev mode
* yarn (or npm) run release // release mode
* yarn (or npm) run lint //linting

 Login with any user name, password must be 'asdasd' atm
 
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
 
 TODOS:
 * get single tweet ("detail mode")
 * put / patch / delete tweets ("edit and delete mode")
 * authentication / authorization (only dummy impl. atm)
 * HATEOAS, link relations
 * collection envelopes (alternative pagination)
 * content negotiation
 * sockets (use case?)
 * file upload / attachments (use case: avatars?)
 * option requests?
 * (restful)query language? (use case: search tweets dynamically)
 * static content to host app on same server?
 * relational DB ?
