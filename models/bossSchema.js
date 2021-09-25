const mongoose = require("mongoose");

const bossSchema = new mongoose.Schema({
    bossNumber: { type: Number, require: true, unique: true},
    bossHP: { type: Number},
    bossName: { type: String},
    bossPP: { type: String},
    attack: { type: Number},
    drop_rate: { type: Number},
    drop_type: { type: String}

});

const model = mongoose.model("BossModels", bossSchema);

module.exports = model;