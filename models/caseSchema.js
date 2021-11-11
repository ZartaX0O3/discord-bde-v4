const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
    serverID: { type: String},
    userID: { type: String, require: true, unique: true},
    sanction: { type: Array},
});

const model = mongoose.model("CaseModels", caseSchema);

module.exports = model;