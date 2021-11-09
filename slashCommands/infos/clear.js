const {MessageActionRow, MessageSelectMenu, MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");
const channels = require("../../channels.json");

module.exports = {
    name: "clear",
    description: "Delete an amount of message given",
    memberpermissions: ['MANAGE_MESSAGES'],
    cooldown: 20,
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {

        const member = client.guilds.cache.get("700630434081669122").members.cache.get(interaction.user.id)

        const embed = new MessageEmbed()
            .setColor("#f4cc5c")
            .setTitle(`${emote.emojis.yellow_circle} **Suppresion de messages**`)
            .addFields(
                {name: " ID Salon : ", value: `${interaction.channel.id}`},
                {name: " Salon : ", value: `${interaction.channel.name}`},
                {name: "Par :", value: `${member.user.username}`}
            )


        const select_menu = new MessageActionRow()
            .addComponents(new MessageSelectMenu()
                .setCustomId("clearOptions")
                .setPlaceholder("Select the amounts of message to delete")
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: "3 messages",
                        value: "one",
                        description: "3 message to delete",
                        emoji: {
                            name: "one", id: `${emote.numbers.id.one}`
                        }
                    },
                    {
                        label: "5 messages",
                        value: "two",
                        description: "5 messages to delete",
                        emoji: {
                            name: "two", id: `${emote.numbers.id.two}`
                        }
                    },
                    {
                        label: "10 messages",
                        value: "three",
                        description: "10 messages to delete",
                        emoji: {
                            name: "three", id: `${emote.numbers.id.three}`
                        }
                    },
                    {
                        label: "20 messages",
                        value: "four",
                        description: "20 message to delete",
                        emoji: {
                            name: "four", id: `${emote.numbers.id.four}`
                        }
                    },
                    {
                        label: "35 messages",
                        value: "five",
                        description: "35 messages to delete",
                        emoji: {
                            name: "five", id: `${emote.numbers.id.five}`
                        }
                    }
                ])
            );

        await interaction.reply({
            content: 'How many message do you want to delete',
            components: [select_menu],
            ephemeral: true});

        const collectorMessage = interaction.channel.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 30000});

        collectorMessage.on("collect", iterator => {
            switch(iterator.values[0]){
                case "one":
                    iterator.deferUpdate()
                    interaction.channel.bulkDelete(3, true);
                    interaction.guild.channels.cache.get(channels.sanctionLogsChannel).send({embeds: [embed]});
                    interaction.editReply({content: '.',embeds: [new MessageEmbed().setColor('GREEN').setDescription(`✅ Deleted 3 messages by ${member.user.username}`)], components: []})
                    embed.addField("Nombre de message",'3');
                    break;

                case "two":
                    iterator.deferUpdate()
                    interaction.channel.bulkDelete(5, true);
                    interaction.guild.channels.cache.get(channels.sanctionLogsChannel).send({embeds: [embed]});
                    interaction.editReply({content: '.',embeds: [new MessageEmbed().setColor('GREEN').setDescription(`✅ Deleted 5 messages by ${member.user.username}`)], components: []})
                    embed.addField("Nombre de message",'5');
                    break;

                case "three":
                    iterator.deferUpdate()
                    interaction.channel.bulkDelete(10, true);
                    interaction.guild.channels.cache.get(channels.sanctionLogsChannel).send({embeds: [embed]});
                    interaction.editReply({content: '.',embeds: [new MessageEmbed().setColor('GREEN').setDescription(`✅ Deleted 10 messages by ${member.user.username}`)], components: []})
                    embed.addField("Nombre de message",'10');
                    break;

                case "four":
                    iterator.deferUpdate()
                    interaction.channel.bulkDelete(20, true);
                    interaction.guild.channels.cache.get(channels.sanctionLogsChannel).send({embeds: [embed]});
                    interaction.editReply({content: '.',embeds: [new MessageEmbed().setColor('GREEN').setDescription(`✅ Deleted 20 messages by ${member.user.username}`)], components: []})
                    embed.addField("Nombre de message",'20');
                    break;

                case "five":
                    iterator.deferUpdate()
                    interaction.channel.bulkDelete(35, true);
                    interaction.guild.channels.cache.get(channels.sanctionLogsChannel).send({embeds: [embed]});
                    interaction.editReply({content: '.',embeds: [new MessageEmbed().setColor('GREEN').setDescription(`✅ Deleted 35 messages by ${member.user.username}`)], components: []})
                    embed.addField("Nombre de message",'35');
                    break;
            }
        });
    }
};
