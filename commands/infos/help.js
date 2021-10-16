const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "help",
    category: "Information",
    aliases: ["help"],
    cooldown: 2,
    usage: "help <<commande>>",
    description: "Affichage des informations d'une commande",
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 1, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args) => {

        const {commands} = message.client;

        const embed = new MessageEmbed()

        if (!args.length) {
            embed.setTitle('Voici une liste de toutes mes commandes : ');

            const commandsUtiles = commands.filter(commandes => commandes.category === "Information");
            const commandsModeration = commands.filter(commandes => commandes.category === "Moderation");

            embed.addFields(
                {name: `**Commandes Utiles :**`, value: `\` ${commandsUtiles.map(cmd => cmd.name).join(', ')} \`\n`},
                {name: `**Commandes de Moderation :**`, value: `\` ${commandsModeration.map(cmd => cmd.name).join(', ')} \`\n`},
            )

            embed.setFooter(`\nTu peux envoyer \`*help [command name]\` pour obtenir des infos sur des commandes spécifiques`);

            return message.channel.send({embeds: [embed]});
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply(`\`Ce n'est pas une commande valide !\``);
        }

        embed.setTitle(`**Name:** ${command.name}`);

        if (command.aliases) embed.addField(`**Aliases :**`, command.aliases.join(', '));
        if (command.description) embed.addField(`**Description :**`, command.description);
        if (command.usage) embed.addField(`**Usage :**`, command.usage);

        embed.addField(`**Cooldown:**`, `${command.cooldown || 3} second(s)`);

        message.channel.send({embeds: [embed]});
    },
};