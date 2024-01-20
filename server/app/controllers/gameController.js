const db = require("../models");
const Game = db.games;
const Round = db.rounds;
const User = db.users; // Assuming you have a User model

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

// Get all games for a specific user by email
const getAllGamesForUser = async (req, res) => {
    try {
        const userEmail = req.params.userMail; // Assuming userMail is provided in the request parameters
        const user = await User.findOne({
            where: {
                email: userEmail,
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
