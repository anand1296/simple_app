const mongoose = require('mongoose');

const credentialsSchema = new mongoose.Schema(
    {
        username: String,
        password: String
    },
    {'collection': 'tenant_credentials'}
);

module.exports = mongoose.model('tenant_credentials', credentialsSchema);