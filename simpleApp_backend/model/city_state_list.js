const mongoose = require('mongoose');

const cityStateListSchema = new mongoose.Schema(
    {
        city: String,
        state: String,
        country: String
    },
    {'collection': 'city_state_list'}
);

module.exports = mongoose.model('city_state_list', cityStateListSchema);