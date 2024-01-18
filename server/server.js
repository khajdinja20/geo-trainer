const express = require('express');
const cors = require('cors');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const db = require('./app/models')
const userRoutes = require('./app/routes/userRoutes')

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync")
})

app.use('/api/geotrainer', userRoutes);

// app.get('/', (req, res) => {
//     res.json({
//         message: 'Geo-Trainer says hello!'
//     });
// });


app.listen(port, () => {
    console.log(`listening on ${port}`);
});