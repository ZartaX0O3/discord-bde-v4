const mongoose = require("mongoose")


const pollSchema = new mongoose.Schema({
    id: { type: String, require: true, unique: true},
    response_1: { type: String},
    response_2: { type: String},
    option_1: { type: Number},
    option_2: { type: Number},
    id_option_1: { type: String},
    id_option_2: { type: String},
    listeVoteurs: { type: Array},
    choixVoteurs: { type: Array},
    author: { type: String},
    question: { type: String},
});

const model = mongoose.model("pollModels", pollSchema);


module.exports = model;