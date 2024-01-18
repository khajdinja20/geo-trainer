// models/roundModel.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Round extends Model {
        static associate(models) {
            Round.belongsTo(models.Game, { foreignKey: 'gameId' });
        }
    }

    Round.init(
        {
            guessPoint: {
                type: DataTypes.GEOMETRY('POINT'),
            },
            correctLocationPoint: {
                type: DataTypes.GEOMETRY('POINT'),
            },
            score: {
                type: DataTypes.INTEGER,
            },
        },
        { sequelize, modelName: 'round', timestamps: true }
    );

    return Round;
};
