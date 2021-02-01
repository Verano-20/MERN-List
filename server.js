const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// Parse requests of content type 'application/json/'
app.use(bodyParser.json());

// Parse requests of content type 'application/x-www-form-urlencoded'
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

// Connect to MongoDB
const dbConfig = require('./app/config/db.config');
const db = require('./app/models');
const Role = db.role;

db.mongoose
    .connect(`${dbConfig.uri}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Successfully connected to MongoDB.');
        initial();
    })
    .catch(err => {
        console.log('MongoDB connection error', err);
        process.exit();
    })

// Public Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/templates/index.html');
});
app.get('/signUp', (req, res) => {
    res.sendFile(__dirname + '/frontend/templates/signUp.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/frontend/templates/login.html');
});
app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/frontend/templates/main.html');
});

require('./app/routes/user.routes')(app);
require('./app/routes/auth.routes')(app);

// Use pre-configured port or 3000 if there is not one
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});

// MongoDB helper function to populate roles collection
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: 'user'
            }).save(err => {
                if (err) {
                    console.log('Error adding "user"', err);
                }
                console.log('Added "user" to roles collection.');
            });
        }
    });
}