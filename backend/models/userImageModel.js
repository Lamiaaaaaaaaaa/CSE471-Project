// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userImageSchema = new Schema({
//     image: {
//         type: String,
//     }
// });

// module.exports = mongoose.model('UserImage', userImageSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userImageSchema = new Schema({
  userId: {
    type: String, 
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('UserImage', userImageSchema);
