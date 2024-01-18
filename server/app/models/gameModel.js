// models/gameModel.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Game extends Model {
        static associate(models) {
            Game.belongsTo(models.User, { foreignKey: 'userId' });
            Game.hasMany(models.Round, { foreignKey: 'gameId' });
        }
    }

    Game.init(
        {
        },
        { sequelize, modelName: 'game', timestamps: true }
    );

    return Game;
};
