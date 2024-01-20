// models/gameModel.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Game extends Model { }

    Game.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Please provide a name for the game.'
                    },
                    notEmpty: {
                        msg: 'Please provide a non-empty name for the game.'
                    }
                }
            },
            datePlayed: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Please provide a date for when the game was played.'
                    }
                }
            },
            theme: {
                type: DataTypes.STRING,
                allowNull: true, // Theme is optional
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',  // Make sure to adjust this based on your actual User model name
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        },
        { sequelize, modelName: 'game', timestamps: true }
    );

    return Game;
};
