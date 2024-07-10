const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userImageSchema = new Schema({
    image: {
        type: String,
    }
});

module.exports = mongoose.model('UserImage', userImageSchema);
