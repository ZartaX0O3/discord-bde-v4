const roles = require("../../roles.json");
const channel = require("../../channels.json")
const Discord = require("discord.js");
const {replacemsg} = require("../../handler/functions");
const ee = require(`../../botconfig/embed.json`);
const settings = require(`../../botconfig/settings.json`);

module.exports = {
    name: "mention",
    category: "Moderations",
    aliases: ["mentions"],
    cooldown: 10,
    usage: "mention <<GROUP>>",
    description: "Mention d'un classe",
    memberpermissions: [],
    requiredroles: ["891011691066851368"],
    alloweduserids: [],
    minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 1, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args) => {


        let groupe;
        const channels = [channel.groupe.premier["1AG1"], channel.groupe.premier["1AG2"], channel.groupe.premier["1AG3"], channel.groupe.premier["1AG4"], channel.groupe.premier["1AG5"], channel.groupe.premier["1AG6"], channel.groupe.premier["1AG7"], channel.groupe.premier["1AG8"], channel.groupe.premier["1AG9"], channel.groupe.premier["1AG10"], channel.groupe.deuxieme["2AG1"], channel.groupe.deuxieme["2AG2"], channel.groupe.deuxieme["2AG3"], channel.groupe.deuxieme["2AG4"], channel.groupe.deuxieme["2AG5"], channel.groupe.deuxieme["2AG6"], channel.groupe.deuxieme["2AG7"], channel.groupe.deuxieme["2AG8"], channel.chan2]
        const group = [[1, roles.groupe.groupe_1], [2, roles.groupe.groupe_2], [3, roles.groupe.groupe_3], [4, roles.groupe.groupe_4], [5, roles.groupe.groupe_5], [6, roles.groupe.groupe_6], [7, roles.groupe.groupe_7], [8, roles.groupe.groupe_8], [9, roles.groupe.groupe_9], [10, roles.groupe.groupe_10]]

        if (!channels.find(element => element === message.channel.id)) return message.reply({
            embeds: [new Discord.MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(replacemsg(settings.unknown_group))
            ]
        }).then(msg => {
            setTimeout(() => {
                msg.delete().catch((e) => {
                    console.log(String(e).grey)
                })
            }, settings.timeout.notallowed_to_exec_cmd.memberpermissions)
        }).catch((e) => {
            console.log(String(e).grey)
        });

        for (const [number, roles] of group) {

            if (args[0] == number) { // Ne pas mettre de  === ici !!!
                groupe = roles;
            }
        }

        message.channel.send({content : `<@&${groupe}>`, allowedMentions : {"roles": [roles.groupe.groupe_1,roles.groupe.groupe_2,roles.groupe.groupe_3,roles.groupe.groupe_4,roles.groupe.groupe_5,roles.groupe.groupe_6,roles.groupe.groupe_7,roles.groupe.groupe_8,roles.groupe.groupe_9,roles.groupe.groupe_10,]} });
        message.delete();

    }
}
