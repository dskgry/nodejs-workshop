module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    const authHeader = req.header('Authorization');
    if (authHeader && authHeader === 'donald-dump') {
        return next();
    }
    return res.send(401);
};