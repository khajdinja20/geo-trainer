// models/roundModel.js
'use strict';
const { Model } = require('sequelize');
const geolib = require('geolib'); // Make sure to install this library: npm install geolib

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
            style: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Please provide a style for the round.'
                    },
                    notEmpty: {
                        msg: 'Please provide a non-empty style for the round.'
                    }
                }
            },
        },
        {
            sequelize,
            modelName: 'round',
            timestamps: true,
            hooks: {
                beforeSave: async (round) => {
                    // Calculate the distance between guessPoint and correctLocationPoint
                    const distance = geolib.getDistance(
                        round.guessPoint.coordinates,
                        round.correctLocationPoint.coordinates
                    );

                    // Calculate the score based on the distance
                    round.score = Math.max(0, 5000 - distance);
                },
            },
        }
    );

    return Round;
};
