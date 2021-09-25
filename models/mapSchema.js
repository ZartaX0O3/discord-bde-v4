const mongoose = require("mongoose");

const mapSchema = new mongoose.Schema({
    id: { type: String },
    owner: { type: String },
    defense: { type: Number, default: 0 },
    color: { type : String },
    message: { type: String },
});

const model = mongoose.model("MapModels", mapSchema);

module.exports = model;