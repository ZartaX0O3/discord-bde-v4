const {MessageEmbed} = require("discord.js");

/*

Commande d'aide global du BOT, permet de comprendre chaque commande de celui-ci 
Prend en premier argument (potentiel) la commande à expliquer

*/

module.exports = {
    name: "help",
    description: "",
    usage: "",
    alias: ["h"],
    cooldown: 3,
    category: "Commandes utiles",
    run: function (client, message, args) {

        const data = [];
        const { commands } = message.client;

        const embed = new MessageEmbed()

        if (!args.length) {
            embed.setTitle('Voici une liste de toutes mes commandes : ');

            const commandsUtiles = commands.filter(commandes => commandes.category == "Commandes utiles");
            const commandsModeration = commands.filter(commandes => commandes.category == "Moderation");
            const commandsJeux = commands.filter(commandes => commandes.category == "Jeux");

            embed.addFields(
                { name : `**Commandes Utiles :**`, value : `\` ${commandsUtiles.map(cmd => cmd.name).join(', ')} \`\n`},
                { name :`**Commandes de Moderation :**`, value : `\` ${commandsModeration.map(cmd => cmd.name).join(', ')} \`\n`},
                { name : `**Commandes de Jeux :**`, value : `\` ${commandsJeux.map(cmd => cmd.name).join(', ')} \`\n`},
            )
            embed.setFooter(`\nTu peux envoyer \`*help [command name]\` pour obtenir des infos sur des commandes spécifiques`);

            return message.channel.send(embed)
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

        embed.addField(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(embed);
    },
};