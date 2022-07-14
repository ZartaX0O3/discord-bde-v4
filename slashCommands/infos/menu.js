const {MessageActionRow, MessageSelectMenu} = require("discord.js");
const {verify} = require("crypto");

module.exports = {
    name: "game",
    description: "Select game menu",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {

        const select_menu = new MessageActionRow()
            .addComponents(new MessageSelectMenu()
                .setCustomId("assignableRoles")
                .setPlaceholder("Select the role")
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: "Valorant",
                        value: "valo",
                        description: "Valorant game role",
                        emoji: {
                            name: "valorant", id: "834777364507525150"
                        }
                    },
                    {
                        label: "Minecraft",
                        value: "mine",
                        description: "Minecraft game role",
                        emoji: {
                            name: "minecraft", id: "834777570100379668"
                        }
                    },
                    {
                        label: "OverWatch",
                        value: "over",
                        description: "Overwatch game role",
                        emoji: {
                            name: "overwatch", id: "834777348901437470"
                        }
                    },
                    {
                        label: "RocketLeague",
                        value: "rocket",
                        description: "RocketLeague game role",
                        emoji: {
                            name: "rocketleague", id: "762643353249775636"
                        }
                    },
                    {
                        label: "LeagueOfLegends",
                        value: "lol",
                        description: "League of Legends game role",
                        emoji: {
                            name: "leaguesoflegends", id: "834777567394267210"
                        }
                    },
                    {
                        label: "ApexLegends",
                        value: "apex",
                        description: "ApexLegends game role",
                        emoji: {
                            name: "apexlegends", id: "889083057997500417"
                        }
                    },
                    {
                        label: "CSGO",
                        value: "csgo",
                        description: "CSGO game role",
                        emoji: {
                            name: "csgo", id: "834777521508843571"
                        }
                    },
                    {
                        label: "OSU",
                        value: "osu",
                        description: "OSU game role",
                        emoji: {
                            name: "osu", id: "834777474432499723"
                        }
                    }
                ])
            );

        const select_menu_private = new MessageActionRow()
            .addComponents(new MessageSelectMenu()
                .setCustomId("assignableRoles")
                .setPlaceholder("Select the role")
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: "Valorant",
                        value: "valo",
                        description: "Valorant game role",
                        emoji: {
                            name: "valorant", id: "834777364507525150"
                        }
                    },
                    {
                        label: "Minecraft",
                        value: "mine",
                        description: "Minecraft game role",
                        emoji: {
                            name: "minecraft", id: "834777570100379668"
                        }
                    },
                    {
                        label: "Star Citizen",
                        value: "over",
                        description: "Overwatch game role",
                        emoji: {
                            name: "StarCitizen", id: "654082699392319528"
                        }
                    },
                    {
                        label: "Trackmania",
                        value: "rocket",
                        description: "RocketLeague game role",
                        emoji: {
                            name: "trackmania", id: "832445472685555742"
                        }
                    },
                    {
                        label: "LeagueOfLegends",
                        value: "lol",
                        description: "League of Legends game role",
                        emoji: {
                            name: "leaguesoflegends", id: "834777567394267210"
                        }
                    },
                    {
                        label: "ApexLegends",
                        value: "apex",
                        description: "ApexLegends game role",
                        emoji: {
                            name: "apexlegends", id: "889083057997500417"
                        }
                    },
                    {
                        label: "World of Tanks",
                        value: "csgo",
                        description: "CSGO game role",
                        emoji: {
                            name: "world_of_tanks", id: "905246506402070548"
                        }
                    },
                    {
                        label: "Satisfactory",
                        value: "osu",
                        description: "OSU game role",
                        emoji: {
                            name: "CH_IconMod", id: "733988209838522398"
                        }
                    },
                    {
                        label: "The Forest",
                        value: "theForest",
                        description: "OSU game role",
                        emoji: {
                            name: "CH_IconTickGreen", id: "785431085541490698"
                        }
                    }
                ])
            );

        let verified;
        if(client.guilds.cache.id === "967517880524607538") verified = select_menu_private;
        else verified = select_menu;

        await interaction.reply({
            content: 'What kind of role do you want ?',
            components: [verified],
            ephemeral: true});

        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 60000});

        collector.on("collect", i => {
            const member = interaction.guild.members.cache.get(interaction.user.id)

            switch(i.values[0]){
                case "valo":
                    let roleValo = "834507897022447636"
                    if(client.guilds.cache.id === "967517880524607538") roleValo = "967521171648180247"
                    i.deferUpdate();
                    if(!member.roles.cache.has(roleValo)){
                        member.roles.add(roleValo);
                        interaction.editReply({ content: `Rôle <@&${roleValo}> récupéré !`, components: [select_menu]})
                    }
                    else{
                        member.roles.remove(roleValo);
                        interaction.editReply({ content: `Rôle <@&${roleValo}> retiré !`, components: [select_menu]});
                    }
                    break;

                case "mine":
                    let roleMine = "834507882829054012"
                    if(client.guilds.cache.id === "967517880524607538") roleMine = "967520198271828028"
                    i.deferUpdate();
                    if(!member.roles.cache.has(roleMine)){
                        member.roles.add(roleMine);
                        interaction.editReply({ content: `Rôle <@&${roleMine}> récupéré !`, components: [select_menu]})
                    }
                    else{
                        member.roles.remove(roleMine);
                        interaction.editReply({ content: `Rôle <@&${roleMine}> retiré !`, components: [select_menu]});
                    }
                    break;

                case "over":
                    let roleOver = "834507894178316308"
                    if(client.guilds.cache.id === "967517880524607538") roleOver = "967520196757717054"
                    i.deferUpdate();
                    if(!member.roles.cache.has(roleOver)){
                        member.roles.add(roleOver);
                        interaction.editReply({ content: `Rôle <@&${roleOver}> récupéré !`, components: [select_menu]})
                    }
                    else{
                        member.roles.remove(roleOver);
                        interaction.editReply({ content: `Rôle <@&${roleOver}> retiré !`, components: [select_menu]});
                    }
                    break;

                case "rocket":
                    let roleRocket = "834507876001120336"
                    if(client.guilds.cache.id === "967517880524607538") roleRocket = "967520200062795836"
                    i.deferUpdate();
                    if(!member.roles.cache.has(roleRocket)){
                        member.roles.add(roleRocket);
                        interaction.editReply({ content: `Rôle <@&${roleRocket}> récupéré !`, components: [select_menu]})
                    }
                    else{
                        member.roles.remove(roleRocket);
                        interaction.editReply({ content: `Rôle <@&${roleRocket}> rerité !`, components: [select_menu]})
                    }
                    break;

                case "lol":
                    let rolelol = "834507879368228955"
                    if(client.guilds.cache.id === "967517880524607538") rolelol = "967520199467229274"
                    i.deferUpdate();
                    if(!member.roles.cache.has(rolelol)){
                        member.roles.add(rolelol);
                        interaction.editReply({ content: `Rôle <@&${rolelol}> récupéré !`, components: [select_menu]})
                    }
                    else{
                        member.roles.remove(rolelol);
                        interaction.editReply({ content: `Rôle <@&${rolelol}> rerité !`, components: [select_menu]})
                    }
                    break;

                case "apex":
                    let roleApex = "884785459375538176"
                    if(client.guilds.cache.id === "967517880524607538") roleApex = "967520197835649034"
                    i.deferUpdate();
                    if(!member.roles.cache.has(roleApex)){
                        member.roles.add(roleApex);
                        interaction.editReply({ content: `Rôle <@&${roleApex}> récupéré !`, components: [select_menu]})
                    }
                    else{
                        member.roles.remove(roleApex);
                        interaction.editReply({ content: `Rôle <@&${roleApex}> rerité !`, components: [select_menu]})
                    }
                    break;

                case "csgo":
                    let roleCSGO = "834507890517344266"
                    if(client.guilds.cache.id === "967517880524607538") roleCSGO = ""
                    i.deferUpdate();
                    if(!member.roles.cache.has(roleCSGO)){
                        member.roles.add(roleCSGO);
                        interaction.editReply({ content: `Rôle <@&${roleCSGO}> récupéré !`, components: [select_menu]})
                    }
                    else{
                        member.roles.remove(roleCSGO);
                        interaction.editReply({ content: `Rôle <@&${roleCSGO}> rerité !`, components: [select_menu]})
                    }
                    break;

                case "osu":
                    let roleOsu = "834507886133903390"
                    i.deferUpdate();
                    if(!member.roles.cache.has(roleOsu)){
                        member.roles.add(roleOsu);
                        interaction.editReply({ content: `Rôle <@&${roleOsu}> récupéré !`, components: [select_menu]})
                    }
                    else{
                        member.roles.remove(roleOsu);
                        interaction.editReply({ content: `Rôle <@&${roleOsu}> rerité !`, components: [select_menu]})
                    }
                    break;
            }


        });
        setTimeout(function () {
            interaction.editReply({content: "End of Interaction",components: []})
        }, 60000);
    }
};
