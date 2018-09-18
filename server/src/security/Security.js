module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader === 'donald-dump') {
        return next();
    }
    return res.send(401);
};