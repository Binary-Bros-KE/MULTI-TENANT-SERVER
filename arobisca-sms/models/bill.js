// models/bill.js
const mongoose = require("mongoose");
const { getArobiscaSmsDB } = require('../config/db');

const arobiscaSmsConnection = getArobiscaSmsDB();
const arobiscaSmsModel = (name, schema, collection) => {
  if (!schema) {
    return arobiscaSmsConnection.model(name);
  }
  return arobiscaSmsConnection.models[name] || arobiscaSmsConnection.model(name, schema, collection);
};

const billSchema = new mongoose.Schema({
  billNumber: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  vendor: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["paid", "pending"], default: "pending" }
}, {
  timestamps: true,
  strict: true
});

const Bill = arobiscaSmsModel("Bill", billSchema, "bills");
module.exports = Bill;
