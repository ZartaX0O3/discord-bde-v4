const {removeRoleGame} = require("../../core/role-giver");

module.exports = async (client, messageReaction, user) => {
    if (user.bot) return;

    const {message} = messageReaction;

    if (message.channel.type !== 'GUILD_TEXT') return;

    if (messageReaction.partial) await messageReaction.fetch();
    if (message.partial) await message.fetch();

    await removeRoleGame(messageReaction, user);
}