const { Client, CommandInteraction } = require("discord.js");

module.exports = {
        name: "ping",
        description: "returns websocket ping",
        type: 'CHAT_INPUT',
        /**
         *
         * @param {Client} client
         * @param {CommandInteraction} interaction
         */
        run: async (client, interaction) => {
                await interaction.followUp({content: `${client.ws.ping}ms!`});
        },
};