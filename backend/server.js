const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const { verifyUser } = require('./VerifyUserToken');

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Succes", name: req.name, email: req.email, userDescription: req.userDescription, City: req.City, Candidate: req.Candidate, Voted : req.Voted});
})

app.post('/user/signup', (req, res) => {
    const checkEmailQuery = "SELECT * FROM login WHERE `email` = ?";
    const values = [req.body.email];

    db.query(checkEmailQuery, values, (error, results) => {
        if (error) {
            return res.json("Error");
        }

        if (results.length > 0) {
            return res.json({ Error: "There is already an account with this email." });

        } else {
            const values = [
                req.body.name,
                req.body.email,
                req.body.password,
            ];

            const insertQuery = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
            db.query(insertQuery, [values], (err) => {
                if (err) {
                    return res.json("Error");
                }
                return res.json({ Status: "Succes" });
            });
        }
    });
});

app.post('/user/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json({ Error: "Login error in server" });
        }

        if (data.length > 0) { 
            const name = data[0].name;
            const email = data[0].email;
            const userDescription = data[0].userDescription;
            const City = data[0].City;
            const Candidate = data[0].Candidate;
            const Voted = data[0].Voted;
            const token = jwt.sign({ name, email, userDescription, City, Candidate, Voted}, "secret-key");
            res.cookie('token', token);
            return res.json("Succes");
        } else {
            return res.json({ Error: "The e-mail or password is not correct" });
        }

    });
});

app.put('/user/updatePassword', (req, res) => {
    const sql = "UPDATE login SET `password` = ? WHERE `email` = ?";
    const email = req.body.email;

    db.query(sql, [req.body.password, email], (err, result) => {
        if (err) {
            console.error("Eroare SQL: ", err);
            return res.json({ Status: "Error", Message: "A apărut o eroare la actualizarea parolei in server." });
        }
        return res.json({ updated: true })
    })
})

app.put('/user/updateEmail', (req, res) => {
    const sql = "UPDATE login SET `email` = ? WHERE `email` = ?";
    const newEmail = req.body.newEmail;

    db.query(sql, [newEmail, req.body.email], (err, result) => {
        if (err) {
            console.error("Eroare SQL: ", err);
            return res.json({ Status: "Error", Message: "A apărut o eroare la actualizarea parolei in server." });
        }
        return res.json({ updated: true })
    })
})

app.put('/user/personalInfo', (req, res) => {
    const values = [
        req.body.City,
        req.body.Zip,
        req.body.PersonalIdentNumber,
        req.body.email
    ];
    
    const insertQuery = "UPDATE login SET `City` = ?, `Zip` = ?, `PersonalIdentNumber` = ? WHERE `email` = ?";
    db.query(insertQuery, values, (err) => {
        if (err) {
            return res.json("Error");
        }
        return res.json({ Status: "Succes" });
    });
})

app.put('/user/updateDescription', (req, res) => {
    const sql = "UPDATE login SET `userDescription` = ? WHERE `email` = ?";
    const userDescription = req.body.userDescription;

    db.query(sql, [userDescription, req.body.email], (err, result) => {
        if (err) {
            console.error("Error SQL: ", err);
            return res.json({ Status: "Error", Message: "Cannot change the description / error on server" });
        }
        return res.json({ updated: true })
    })
})

app.put('/user/updateVotes', (req, res) => {
    const sql = "UPDATE login SET `Votes` = `Votes` + 1 WHERE `email` = ?";
    const email = req.body.email;

    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Error SQL: ", err);
            return res.json({ Status: "Error", Message: "Cannot add any votes / error on server"});
        } 
        return res.json ({ updated: true })
    })
})

app.put('/user/hasVoted', (req, res) => {
    const sql = "UPDATE login SET  `Voted` = 1 WHERE `email` = ?";
    const email = req.body.email;

    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Error SQL: ", err);
            return res.json({ Status: "Error", Message: "Cannot add any votes / error on server"});
        } 
        return res.json ({ updated: true })
    })
})

app.get('/user/totalVotes', (req, res) => {
    const sql = "SELECT SUM(`Votes`) AS totalVotes FROM login";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error SQL: ", err);
            return res.json({ Status: "Error", Message: "Cannot retrieve total votes / error on server"});
        }

        const totalVotes = result[0].totalVotes;
        return res.json({ totalVotes });
    });
});

app.get('/getCandidates/list', (req, res) => {
    const sql = "SELECT * FROM login WHERE `Candidate` = 1";

    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error trying to get Candidates");
        }
        return res.json(data);
    });
});

app.get('/user/candidate/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM login WHERE `id` = ? AND `Candidate` = 1";

    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json("Error trying to get CandidateID");
        }
        return res.json(data);
    });
});

app.put('/user/isCandidate', (req, res) => {
    const sql = "UPDATE login SET  `Candidate` = 1 WHERE `email` = ?";
    const email = req.body.email;

    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Error SQL: ", err);
            return res.json({ Status: "Error", Message: "Cannot add any votes / error on server"});
        } 
        return res.json ({ updated: true })
    })
})

app.get('/user/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Succes" });
})

app.listen(8081, () => {
    console.log("Listening");
})
