const {groupeRemover, removeRoleGame} = require("../core/role-giver");

module.exports = async (client, messageReaction, user) => {
    if (user.bot) return;

    const {message} = messageReaction;

    if (message.channel.type !== "text") return;

    if (messageReaction.partial) await messageReaction.fetch();
    if (message.partial) await message.fetch();

    removeRoleGame(messageReaction, user);
}