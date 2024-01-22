module.exports = (req, res, next) => {
    // Проверка на доверенный IP-адрес
    const trustedIPs = ["::ffff:127.0.0.1", "31.129.102.70", "::1"]; // добавлен '::1' для IPv6 localhost
    const clientIP = req.ip || req.socket.remoteAddress;

    if (!trustedIPs.includes(clientIP)) {
        return res.status(403).send("Forbidden");
    }

    next();
};
