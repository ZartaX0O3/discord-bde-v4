const {groupeGiver, giveRoleGame, yearGiver} = require("../core/role-giver")

module.exports = async (client, messageReaction, user) => {

    if (user.bot) return;

    const {message} = messageReaction;
    
    if (message.channel.type !== "text") return;

    if (messageReaction.partial) await messageReaction.fetch();
    if (message.partial) await message.fetch();

    groupeGiver(messageReaction, user);
    yearGiver(messageReaction, user);
    giveRoleGame(messageReaction, user);

}