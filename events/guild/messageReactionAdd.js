const {groupeGiver, giveRoleGame, groupeGiver2, yearGiver} = require("../../core/role-giver")

module.exports = async (client, messageReaction, user) => {

    if (user.bot) return;
    const {message} = messageReaction;

    if (message.channel.type !== 'GUILD_TEXT') return;
    if (messageReaction.partial) await messageReaction.fetch();
    if (message.partial) await message.fetch();

    await groupeGiver(messageReaction, user);
    await yearGiver(messageReaction, user);
    await giveRoleGame(messageReaction, user);
    await groupeGiver2(messageReaction, user);

}