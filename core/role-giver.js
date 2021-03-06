const channels = require("../channels.json");
const emojis = require("../emojis.json");
const roles = require("../roles.json");
const {MessageEmbed} = require("discord.js");

const emojiToRoleIDGroupe = [
    [emojis.numbers.name.one, roles.groupe.groupe_1],
    [emojis.numbers.name.two, roles.groupe.groupe_2],
    [emojis.numbers.name.three, roles.groupe.groupe_3],
    [emojis.numbers.name.four, roles.groupe.groupe_4],
    [emojis.numbers.name.five, roles.groupe.groupe_5],
    [emojis.numbers.name.six, roles.groupe.groupe_6],
    [emojis.numbers.name.seven, roles.groupe.groupe_7],
    [emojis.numbers.name.eight, roles.groupe.groupe_8],
    [emojis.numbers.name.nine, roles.groupe.groupe_9],
    [emojis.numbers.name.zero, roles.groupe.groupe_10],
    [emojis.extra.phone, roles.licence.licencePm],
    [emojis.extra.www, roles.licence.licenceWeb],
    [emojis.extra.rt, roles.licence.licenceRt]
]

const emojiToRoleIDGroupe2A = [
    [emojis.numbers.name.one, roles.deuxa2.groupe_1A],
    [emojis.numbers.name.two, roles.deuxa2.groupe_2A],
    [emojis.numbers.name.three, roles.deuxa2.groupe_3A],
    [emojis.numbers.name.four, roles.deuxa2.groupe_1B],
    [emojis.numbers.name.five, roles.deuxa2.groupe_2B],
    [emojis.numbers.name.six, roles.deuxa2.groupe_3B],
    [emojis.numbers.name.seven, roles.deuxa2.groupe_4B],
]

const emojiToRoleCateg = [
    [emojis.extra.IUT, roles.extra.finish],
    [emojis.extra.text, roles.extra.invite],
    [emojis.numbers.name.one, roles.extra.first_year],
    [emojis.numbers.name.two, roles.extra.second_year],
    [emojis.numbers.name.three, roles.extra.licence],
    [emojis.extra.admin_emote, roles.extra.professor]
]

const emojiToRoleIDGame = [
    [emojis.game.name.valorant, roles.game.valorant],
    [emojis.game.name.rocketleague, roles.game.rocket_league],
    [emojis.game.name.csgo, roles.game.csgo],
    [emojis.game.name.minecraft, roles.game.minecraft],
    [emojis.game.name.osu, roles.game.osu],
    [emojis.game.name.lol, roles.game.lol],
    [emojis.game.name.overwatch, roles.game.overwatch],
    [emojis.game.name.apex, roles.game.apex]
]

const emojiToRoleIDGamePrivate = [
    [emojis.game.name.valorant, roles.game.valorantPV],
    [emojis.game.name.wot, roles.game.wotPV],
    [emojis.game.name.trackmania, roles.game.tmPV],
    [emojis.game.name.minecraft, roles.game.minecraftPV],
    [emojis.game.name.satisfactory, roles.game.satisfactoryPV],
    [emojis.game.name.lol, roles.game.lolPV],
    [emojis.game.name.the_forest, roles.game.theForestPV],
    [emojis.game.name.apex, roles.game.apexPV],
    [emojis.game.name.starCitizen, roles.game.starCitizenPV]
]

const groupeGiver = async (reaction, user) => {

    const {message, emoji} = reaction
    if (channels.chan3 !== message.channel.id) return;
    const member = message.guild.members.cache.get(user.id)

    if (!member) return;

    for (const [emojiID, roles] of emojiToRoleIDGroupe) {
        if (member.roles.cache.has(roles)) {
            member.roles.remove(roles)
        }
    }

    for (const [emojiID, role] of emojiToRoleIDGroupe) {
        if ((emoji.name || emoji.id) === emojiID) {

            let targetRole = role;

            if (member.roles.cache.has(roles.extra.second_year)) {
                if (targetRole === roles.groupe.groupe_9 || targetRole === roles.groupe.groupe_10) {

                    message.channel.send("Il n'y a pas de groupe 9 et 10 pour les deuxi??me ann??es :(").then(msg => {
                        setTimeout(() => {
                            msg.delete()
                        }, 20000)
                    });

                    break;
                }
            }

            if (member.roles.cache.has(roles.extra.second_year) || member.roles.cache.has(roles.extra.first_year)) {
                if (targetRole === roles.licence.licencePm || targetRole === roles.licence.licenceWeb || targetRole === roles.licence.licenceRt) {

                    message.channel.send("Impossible de r??cup??rer ce r??le en tant que 1A ou 2A").then(msg => {
                        setTimeout(() => {
                            msg.delete()
                        }, 20000)
                    });

                    break;
                }
            }

            if (!member.roles.cache.has(targetRole)) {
                member.roles.add(targetRole);
                message.channel.send(`<@${member.id}> ?? bien re??u son r??le !`).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000)
                });
                break;
            } else {
                member.roles.remove(targetRole);
                message.channel.send(`<@${member.id}> ?? bien retir?? son r??le !`).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000)
                });
                break;
            }
        }
    }
    reaction.users.remove(user.id);
}

const groupeGiver2 = async (reaction, user) => {

    const {message, emoji} = reaction
    if (channels.chan5 !== message.channel.id) return;
    const member = message.guild.members.cache.get(user.id)

    if (!member) return;

    for (const [emojiID, roles] of emojiToRoleIDGroupe2A) {
        if (member.roles.cache.has(roles)) {
            member.roles.remove(roles)
        }
    }

    for (const [emojiID, role] of emojiToRoleIDGroupe2A) {
        if ((emoji.name || emoji.id) === emojiID) {

            let targetRole = role;

            if (member.roles.cache.has(roles.extra.second_year) || member.roles.cache.has(roles.extra.first_year)) {
                if (!member.roles.cache.has(targetRole)) {
                    member.roles.add(targetRole);
                    message.channel.send(`<@${member.id}> ?? bien re??u son r??le !`).then(msg => {
                        setTimeout(() => {
                            msg.delete()
                        }, 5000)
                    });
                    break;
                } else {
                    member.roles.remove(targetRole);
                    message.channel.send(`<@${member.id}> ?? bien retir?? son r??le !`).then(msg => {
                        setTimeout(() => {
                            msg.delete()
                        }, 5000)
                    });
                    break;
                }
            }
        }
    }
    reaction.users.remove(user.id);
}

const yearGiver = async (reaction, user) => {

    const {message, emoji} = reaction

    if (channels.chan4 !== message.channel.id) return;

    const member = message.guild.members.cache.get(user.id)

    if (!member) return;

    for (const [emojiID, role] of emojiToRoleCateg) {

        if (member.roles.cache.has(role)) {
            member.roles.remove(role);
        }

    }

    for (const [emojiID, role] of emojiToRoleCateg) {

        if ((emoji.name || emoji.id) === emojiID) {

            let targetRole = role;

            if (targetRole === roles.extra.professor) {

                message.channel.send("Veuillez contacter un Administrateur pour r??cup??rer ce r??le ! (Via un channel d'aide ou en message priv??)").then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 20000)
                });

                const embed = new MessageEmbed()
                    .setColor("#000000")
                    .setTitle(`${emojis.emojis.black_circle} **Demande de r??le Professeur**`)
                    .addFields(
                        {name: "Joueur :", value: member.user.tag},
                    )
                    .setTimestamp()
                message.guild.channels.cache.get(channels.sanctionLogsChannel).send(embed);
                break;

            }

            if (!member.roles.cache.has(targetRole)) {

                member.roles.add(targetRole);
                message.channel.send(`<@${member.id}> ?? bien re??u son r??le !`).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000)
                });

                break;

            } else {

                member.roles.remove(targetRole);
                message.channel.send(`<@${member.id}> ?? bien retit?? son r??le !`).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000)
                });
                break;

            }
        }
    }
    reaction.users.remove(user.id);
}

const giveRoleGame = async (reaction, user) => {

    const {message, emoji} = reaction

    if (message.channel.id !== "997160453149032578" ) return;

    const member = message.guild.members.cache.get(user.id)

    if (!member) return;


    if (message.guild.id === "967517880524607538") {

        for (const [emojiID, role] of emojiToRoleIDGamePrivate) {

            if (emoji.name === emojiID) {

                let targetRole = role;

                if (!member.roles.cache.has(targetRole)) {
                    member.roles.add(targetRole);
                }
            }
        }
    }

}

const removeRoleGame = async (reaction, user) => {

    const {message, emoji} = reaction
    console.log(emoji.name)
    if (message.channel.id !== "997160453149032578" ) return;

    const member = message.guild.members.cache.get(user.id)

    if (!member) return;

    if (message.guild.id === "967517880524607538") {

        for (const [emojiID, role] of emojiToRoleIDGamePrivate) {

            if (emoji.name === emojiID) {
                console.log(emoji.name)

                let targetRole = role;

                if (member.roles.cache.has(targetRole)) {
                    member.roles.remove(targetRole);
                }
            }
        }
    }
}


module.exports = {groupeGiver, yearGiver, groupeGiver2, giveRoleGame, removeRoleGame}
