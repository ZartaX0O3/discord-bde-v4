const bossModel = require("../../models/bossSchema");

module.exports = {
    name: "newboss",
    cooldown: 5,
    run: async function (client, message, args) {

    if(!message.member.permissions.has("ADMINISTRATOR")) return;

    let boss_Number = args[0];
    console.log(boss_Number)
    let boss_HP = args[1];
    let boss_PP = args[2];
    let Attack = args[3];
    let Drop_rate = args[4];
    let Drop_type = args[5];
    args.shift();
    args.shift();
    args.shift();
    args.shift();
    args.shift();
    args.shift();
    let boss_Name = args.join(" ");

    console.log(boss_Number, boss_HP, boss_PP, Attack, Drop_rate, Drop_type, boss_Name);
    let inventoryData;

        try {
            boss = await bossModel.findOne({bossNumber: boss_Number});
            if (!inventoryData) {
                let profile = await bossModel.create({
                    bossNumber: boss_Number,
                    bossHP : boss_HP,
                    bossName : boss_Name,
                    bossPP : boss_PP,
                    attack: Attack,
                    drop_rate: Drop_rate,
                    drop_type: Drop_type,
                })
                profile.save();
                message.reply(`Boss n°${boss_Number} enregistré, HP : ${boss_HP}, Name : ${boss_Name}, PP : ${boss_PP}, Attaque : ${Attack}, DROP_rate : ${Drop_rate}, DROP_type : ${Drop_type}`);
            }
        } catch (err) {
            console.log(err);
        }
    }
}