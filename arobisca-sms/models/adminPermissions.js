// models/adminPermissions.js
const mongoose = require('mongoose');
const { getArobiscaSmsDB } = require('../config/db');

const arobiscaSmsConnection = getArobiscaSmsDB();
const arobiscaSmsModel = (name, schema, collection) => {
  if (!schema) {
    return arobiscaSmsConnection.model(name);
  }

  return arobiscaSmsConnection.models[name] || arobiscaSmsConnection.model(name, schema, collection);
};

// Singleton document: one settings record controls what Junior Admins can access.
// Senior Admins always have unrestricted access and are never gated by this.
const adminPermissionsSchema = new mongoose.Schema({
  juniorAllowedTabs: { type: [String], default: [] },
}, {
  timestamps: true
});

const AdminPermissions = arobiscaSmsModel('AdminPermissions', adminPermissionsSchema);
module.exports = AdminPermissions;
