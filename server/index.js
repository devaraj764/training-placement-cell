require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;


// running express
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(morgan('tiny'))
app.set('view engine', 'ejs');


// import routes
const auth = require('./routes/auth.route.js');
const studentsRoute = require('./routes/students.route.js');
const adminRoute = require('./routes/admin.route.js');
const aluminiRoute = require('./routes/alumini.route.js');

// middleware
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PATCH']
}));

app.use('/api/auth', auth);
app.use('/api/students', studentsRoute);
app.use('/api/admin', adminRoute);
app.use('/api/alumini', aluminiRoute);

// Routes
app.get('/api', (req, res) => {
    res.json("Hello world!!!");
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

// connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log("Connected to DB")
}).catch(err => console.error(err));

// listening to server
app.listen(port, async () => {
    console.log(`listening on http://localhost:${port}`);
});

