const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/geotrainer', { dialect: "postgres" });

sequelize.authenticate().then(() => {
    console.log("Connected to database geotrainer");
}).catch((err) => {
    console.log(err)
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel')(sequelize, DataTypes);
db.games = require('./gameModel')(sequelize, DataTypes);
db.rounds = require('./roundModel')(sequelize, DataTypes);

module.exports = db;

