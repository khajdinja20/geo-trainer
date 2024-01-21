const db = require("../models");
const Game = db.games;
const Round = db.rounds;
const User = db.users; // Assuming you have a User model
const geolib = require('geolib');


// Create a new game
const createGame = async (req, res) => {
    try {
        const { name, datePlayed, theme, userEmail } = req.body;

        // Find the user by email
        const user = await User.findOne({
            where: {
                email: userEmail,
            },
        });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Create the game and associate it with the user
        const game = await Game.create({
            name,
            datePlayed,
            theme,
            userId: user.id,
        });

        return res.status(201).json(game);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

// Get all games for a specific user
const getAllGamesForUser = async (req, res) => {
    try {
        const userMail = req.params.userMail;
        const user = await User.findOne({
            where: {
                email: userMail,
            },
        });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const games = await Game.findAll({
            where: {
                userId: user.id,
            },
        });

        return res.status(200).json(games);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};


// Create a new round for a specific game
const createRound = async (req, res) => {
    try {
        const { guessPoint, correctLocationPoint, style, gameId } = req.body;
        const data = { guessPoint, correctLocationPoint, style, gameId };
        const round = await Round.create(data);

        // Find the worst round for the associated game
        const worstRound = await Round.findOne({
            where: { gameId },
            order: [['score', 'ASC']], // Assuming lower score is worse
        });

        if (worstRound) {
            // Update worst round information in the associated game
            const worstRoundInfo = {
                roundId: worstRound.id,
                distance: worstRound.guessPoint
                    ? geolib.getDistance(
                        worstRound.guessPoint.coordinates,
                        worstRound.correctLocationPoint.coordinates
                    )
                    : null, // Handle the case where guessPoint is not available
                style: worstRound.style
            };

            const associatedGame = await Game.findByPk(gameId);
            await associatedGame.update({ worstRoundInfo });
        }

        return res.status(201).json(round);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};


// Get all rounds for a specific game
const getAllRoundsForGame = async (req, res) => {
    try {
        const gameId = req.params.gameId;
        const rounds = await Round.findAll({
            where: { gameId },
        });

        return res.status(200).json(rounds);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createGame,
    getAllGamesForUser,
    createRound,
    getAllRoundsForGame,
};
