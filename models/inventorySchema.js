const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    void_energy : { type: Number, default: 0},
    xp : { type: Number, default: 1},
    mana: { type: Number, default: 0, max: 100,min: 0},
    hp: { type: Number, default: 30, max: 30, min: 0},
    manaBank: { type: Number, default: 0},
    coins: { type: Number, default: 1000},
    bank: { type: Number },
    stoneGenerator: {type: Number, default: 0},
    chestplate: {type: Number, default: 0},
    pickaxe: { type: Number, default: 0},
    sword: { type: Number, default: 0},
    attack: { type: Number, default: 1},
    defense: { type: Number, default: 1}, 
    valkyrie: { type : Number, default: 0},
    stone: { type: Number, default: 0},
    iron: { type: Number, default: 0},
    gold: { type: Number, default: 0},
    boss: { type: Number, default: 1},
    boss_max: { type: Number, default: 1},
    alpha : { type: Number, default: 0},
    beta : { type: Number, default: 0},
    gamma : { type: Number, default: 0},
    delta : { type: Number, default: 0},
    epsilon : { type: Number, default: 0}
});

const model = mongoose.model("InventoryModels", inventorySchema);

module.exports = model;