const mongoose = require("mongoose");

const valorantSchema = new mongoose.Schema({
    id : { type: String, required: true, unique: true},
    tag: { type: String},
    name: { type: String},
    currenttierpatched: { type: String},
    ranking_in_tier: {type: Number},
    elo: { type: Number},
    cardURL_small : {type: String},
    cardURL_large : {type: String},
    cardURL_wide : {type: String}
});

const model = mongoose.model("valorantModels", valorantSchema);


module.exports = model;