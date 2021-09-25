const MapModel = require("../../models/mapSchema");

module.exports = {
    name: "newmap",
    cooldown: 0,
    run: async function (client, message, args) {

    if(!message.member.permissions.has("ADMINISTRATOR")) return;

    const ID = args[0];
    const color = args[1];
    
    let mapData;

        try {
            boss = await MapModel.findOne({id: ID});
            if (!mapData) {
                let profile = await MapModel.create({
                    id: ID,
                    owner: null,
                    defense : 0,
                    color : color,
                    message: "Message"
                })
                profile.save();
                message.reply(`ID : ${ID} enregistré`);
            }
        } catch (err) {
            console.log(err);
        }
    }
}