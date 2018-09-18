//TODO
// - export a middleware that checks if the Authorization-Header is present and has the value "donald-dump"
// - use the req.header('HEADER')-Function to extract a header
// - call next only if the "authentication" worked. Answer with 401 otherwise
// - add the middleware in Server.js AFTER the CORS-Middleware (use server.use(...))