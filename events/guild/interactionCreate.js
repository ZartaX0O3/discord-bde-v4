const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const settings = require(`../../botconfig/settings.json`);
const { onCoolDown, replacemsg } = require("../../handler/functions");
const Discord = require("discord.js");
module.exports = (client, interaction, message) => {

    const CategoryName = interaction.commandName;

    let command = false;
    try{
        console.log("test");
        if (client.slashCommands.has(CategoryName + interaction.options.getSubcommand())) {
            command = client.slashCommands.get(CategoryName + interaction.options.getSubcommand());
        }
        else{
            console.log(command);
        }
    }catch{
        if (client.slashCommands.has("normal" + CategoryName)) {
            command = client.slashCommands.get("normal" + CategoryName);
        }
    }
    if(command) {
        console.log("test");
        if (onCoolDown(interaction, command)) {
            return interaction.reply({ephemeral: true,
                embeds: [new Discord.MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(replacemsg(settings.messages.cooldown, {
                        prefix: config.prefix,
                        command: command,
                        timeLeft: onCoolDown(interaction, command)
                    }))]
            });
        }
        console.log("test");
        //if Command has specific permission return error
        if (command.memberpermissions && command.memberpermissions.length > 0 && !interaction.member.permissions.has(command.memberpermissions)) {
            return interaction.reply({ ephemeral: true, embeds: [new Discord.MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
                    .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.memberpermissions, {
                        command: command,
                        prefix: config.prefix
                    }))]
            });
        }
        console.log("test");
        //if Command has specific needed roles return error
        if (command.requiredroles && command.requiredroles.length > 0 && interaction.member.roles.cache.size > 0 && !interaction.member.roles.cache.some(r => command.requiredroles.includes(r.id))) {
            return interaction.reply({ ephemeral: true, embeds: [new Discord.MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
                    .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.requiredroles, {
                        command: command,
                        prefix: config.prefix
                    }))]
            })
        }
        console.log("test");
        //if Command has specific users return error
        if (command.alloweduserids && command.alloweduserids.length > 0 && !command.alloweduserids.includes(interaction.member.id)) {
            return message.channel.send({ ephemeral: true, embeds: [new Discord.MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
                    .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.alloweduserids, {
                        command: command,
                        prefix: config.prefix
                    }))]
            });
        }
        console.log("test");
        //execute the Command
        command.run(client, interaction, interaction.member, interaction.guild)
    }
}
