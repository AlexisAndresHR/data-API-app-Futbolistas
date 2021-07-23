/**
 * Code for the Players requests processing
 */
module.exports = function playersHandler(players) {
    return {
        // Players method GET
        get: (data, callback) => {
            if (typeof data.index !== "undefined") {
                console.log("Handler players", { data });
                if (players[data.index]) {
                    return callback(200, players[data.index]);
                }
                return callback(404, {
                    message: `The player # ${data.index} doesn't exists`,
                });
            }
            callback(200, players);
        },
    };

};
