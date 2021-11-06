const {MessageActionRow, MessageSelectMenu} = require("discord.js");
const emote = require("../../emojis.json");

module.exports = {
    name: "clear",
    description: "Delete an amount of message given",
    memberpermissions: ['MANAGE_MESSAGES'],
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {

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
                    iterator.deferUpdate();
                    interaction.channel.bulkDelete(3, true);
                    interaction.editReply({ content: `3 messages supprimés`, components: []})
                    break;

                case "two":
                    iterator.deferUpdate();
                    interaction.channel.bulkDelete(5, true);
                    interaction.editReply({ content: `5 messages supprimés`, components: []})
                    break;

                case "three":
                    iterator.deferUpdate();
                    interaction.channel.bulkDelete(10, true);
                    interaction.editReply({ content: `10 messages supprimés`, components: []})
                    break;

                case "four":
                    iterator.deferUpdate();
                    interaction.channel.bulkDelete(20, true);
                    interaction.editReply({ content: `20 messages supprimés`, components: []})
                    break;

                case "five":
                    iterator.deferUpdate();
                    interaction.channel.bulkDelete(35, true);
                    interaction.editReply({ content: `35 messages supprimés`, components: []})
                    break;
            }
        });
        setTimeout(function () {
            interaction.editReply({content: "End of Interaction",components: []})
        }, 60000);

    }
};
