const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  ssn: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return /\d{3}-\d{2}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid social security number!`,
    },
  },
  address: { type: String, required: false },
  phoneNumber: {
    type: String,
    required: false,
    validate: {
      validator(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
