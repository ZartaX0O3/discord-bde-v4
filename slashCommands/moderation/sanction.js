const {MessageActionRow, MessageSelectMenu, MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");
const channels = require("../../channels.json");
const CaseModels = require("../../models/caseSchema");


module.exports = {
    name: "sanction",
    description: "Sanction a user",
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 20,
    type: 'CHAT_INPUT',
    options: [
        {"String": { name: "identifier", description: "What should be the Embed title?", required: true }}
    ],
    run: async (client, interaction) => {

        try {
            const {
                options
            } = interaction;

            let member = client.guilds.cache.get("700630434081669122").members.cache.get(interaction.user.id)

            const embed = new MessageEmbed()
                .setColor("#000000")
                .setTitle(`${emote.emojis.black_circle} **Sanction d'un membre**`)
                .addFields(
                    {name: " ID Salon : ", value: `${interaction.channel.id}`},
                    {name: " Salon : ", value: `${interaction.channel.name}`},
                    {name: "De :", value: `${member.user.username}`}
                )

            let id = options.getString("identifier");
            if (!id) return interaction.reply("ID non-renseigné");

            member = client.guilds.cache.get("700630434081669122").members.cache.get(id)
            if (!member) return interaction.reply("Membre non trouvé");

            let caseData;

            try {
                caseData = await CaseModels.findOne({userID: id});
                if (!caseData) {
                    let Case = await CaseModels.create({
                        userID: id,
                        serverID: interaction.guild.id,
                        sanction: []
                    })
                    await Case.save();
                }
            } catch (err) {
                console.log(err);
            }

            const select_menu = new MessageActionRow()
                .addComponents(new MessageSelectMenu()
                    .setCustomId("sanctionOptions")
                    .setPlaceholder("Choose the sanction")
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: "Warn",
                            value: "one",
                            description: "Warn a member, after 3 warn automatic kick, after 5 warn ban",
                            emoji: {
                                name: "one", id: `${emote.numbers.id.one}`
                            }
                        },
                        {
                            label: "Kick",
                            value: "two",
                            description: "Kick a member",
                            emoji: {
                                name: "two", id: `${emote.numbers.id.two}`
                            }
                        },
                        {
                            label: "Ban",
                            value: "three",
                            description: "Ban a member",
                            emoji: {
                                name: "three", id: `${emote.numbers.id.three}`
                            }
                        }
                    ])
                );

            await interaction.reply({
                content: 'What sanction do you want to apply to the member ?',
                components: [select_menu],
                ephemeral: true
            });

            const collectorMessage = interaction.channel.createMessageComponentCollector({
                componentType: 'SELECT_MENU',
                time: 30000
            });
            let Case = await CaseModels.findOne({userID: id});
            let sanctions = Case.sanction;

            collectorMessage.on("collect", iterator => {
                switch (iterator.values[0]) {
                    case "one":
                        iterator.deferUpdate();
                        embed.addField("Sanction", `Warn de ${member.user.username}`);
                        sanctions.push(`Warn | ${interaction.createdAt} | ${interaction.user.username}`);
                        Case.sanction = sanctions;
                        Case.save();
                        interaction.guild.channels.cache.get(channels.sanctionLogsChannel).send({embeds: [embed]});
                        interaction.editReply({
                            content: '.',
                            embeds: [new MessageEmbed().setColor('GREEN').setDescription(`✅ Member ${member.user.username} warn`)],
                            components: []
                        });
                        break;

                    case "two":
                        iterator.deferUpdate();
                        embed.addField("Sanction", `Kick de ${member.user.username}`);
                        sanctions.push(`Kick | ${interaction.createdAt} | ${interaction.user.username}`);
                        Case.sanction = sanctions;
                        Case.save();
                        if (member.kickable) member.kick();
                        else console.log("Impossible de kick cette personne");
                        interaction.guild.channels.cache.get(channels.sanctionLogsChannel).send({embeds: [embed]});
                        interaction.editReply({
                            content: '.',
                            embeds: [new MessageEmbed().setColor('GREEN').setDescription(`✅ Member ${member.user.username} kick`)],
                            components: []
                        });
                        break;

                    case "three":
                        iterator.deferUpdate();
                        embed.addField("Sanction", `Ban de ${member.user.username}`);
                        sanctions.push(`Ban | ${interaction.createdAt} | ${interaction.user.username}`);
                        Case.sanction = sanctions;
                        Case.save();
                        if (member.bannable) member.ban();
                        else console.log("Impossible de ban cette personne");
                        interaction.guild.channels.cache.get(channels.sanctionLogsChannel).send({embeds: [embed]});
                        interaction.editReply({
                            content: '.',
                            embeds: [new MessageEmbed().setColor('GREEN').setDescription(`✅ Member ${member.user.username} ban`)],
                            components: []
                        });
                        break;
                }
            });
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    }
};