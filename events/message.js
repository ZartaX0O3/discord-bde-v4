const profileModel = require("../models/profileSchema");
const inventoryModel = require("../models/inventorySchema");
const {Collection} = require("discord.js");

module.exports = async (client, message) => {

    // Ignore all bots
    if (message.author.bot) return;


    let profileData;
    let inventoryData;

    try {
        profileData = await profileModel.findOne({userID: message.author.id});
        inventoryData = await inventoryModel.findOne({userID: message.author.id});
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.member.id,
                serverID: message.guild.id,
                coins: 1000,
                bank: 0
            })
            profile.save();
        }
    } catch (err) {
        console.log(err);
    }

    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.alias?.includes(commandName));

    if (!command) return;
    // If that command doesn't exist, silently exit and do nothing
    try {
        const {cooldowns} = client

        if (!command.cooldown) return command.run(client, message, args)

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection())
        }

        const timestamps = cooldowns.get(command.name)
        const cooldownInMs = command.cooldown * 1000

        if (timestamps.has(message.author.id)) {
            const expiration = timestamps.get(message.author.id) + cooldownInMs

            if (Date.now() < expiration) {
                let timeLeftInS = (expiration - Date.now()) / 1000
                if(timeLeftInS>3600) {
                    timeLeftInS = timeLeftInS / 3600
                    return message.reply(`tu pourras re-exécuter la commande \`${command.name}\` dans ${timeLeftInS.toFixed(1)}h.`)
                }
                else if(timeLeftInS>60) {
                    timeLeftInS = timeLeftInS / 60
                    return message.reply(`tu pourras re-exécuter la commande \`${command.name}\` dans ${timeLeftInS.toFixed(1)}m.`)
                }
                else {
                    return message.reply(`tu pourras re-exécuter la commande \`${command.name}\` dans ${timeLeftInS.toFixed(1)}s.`)
                }
            }
        }

        command.run(client, message, args, profileData, inventoryData)

        timestamps.set(message.author.id, Date.now());
        setTimeout(() => timestamps.delete(message.author.id), cooldownInMs);

    } catch (e) {
        console.log(e);
    }
};