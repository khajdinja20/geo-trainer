// models/roundModel.js
'use strict';
const { Model } = require('sequelize');
const geolib = require('geolib');

module.exports = (sequelize, DataTypes) => {
    class Round extends Model { }

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
            gameId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'games',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
                        round.correctLocationPoint.coordinates,
                        1 //For precision, smaller number is more precise(1 = m, 0.01 = cm, etc)
                    );

                    // Calculate the score based on the distance
                    const sigma = 1000;
                    round.score = Math.round(5000 * Math.exp(-0.5 * Math.pow(distance / sigma, 2)));
                },
            },
        }
    );

    return Round;
};
