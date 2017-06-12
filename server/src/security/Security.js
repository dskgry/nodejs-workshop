/**
 * @author Sven Koelpin
 */

//TODO
// - export a middleware that checks if the Authorization-Header is present and has the value "donald-dump"
// - use the req.header('HEADER')-Function to extract a header
// - call next only if the "authentication" worked. Answer with 401 otherwise
// - skip the middleware if the HTTP-METHOD (req.method) equals 'OPTIONS'
// - add the middleware in Server.js AFTER routing (.use())