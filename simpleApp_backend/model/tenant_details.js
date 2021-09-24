const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema(
    {
        name: String,
        age: String,
        country: String,
        state: String,
        city: String,
        gender: String,
        email: String,
        description: String,
        DoB: Date,
        phone: String,
        image: String
    },
    {'collection': 'tenant_details'}
);

module.exports = mongoose.model('tenant_details', detailsSchema);