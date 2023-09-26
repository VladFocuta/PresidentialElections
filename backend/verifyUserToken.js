const jwt = require('jsonwebtoken');

function verifyUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You must log-in" });
    } else {
        jwt.verify(token, "secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "The token is not correct" });
            } else {
                req.name = decoded.name;
                req.email = decoded.email;
                req.userDescription = decoded.userDescription;
                req.City = decoded.City;
                req.Candidate = decoded.Candidate;
                req.Voted = decoded.Voted;
                next();
            }
        });
    }
};

module.exports = { verifyUser };
