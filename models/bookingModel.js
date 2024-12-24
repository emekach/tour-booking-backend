const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Booking must belong to a Tour!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
      required: [true, 'Booking must belong to a User'],
    },
    price: {
      type: Number,
      required: [true, 'A booking must have a price'],
    },
    paid: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.pre(/^find/, function (next) {
  this.populate('users').populate({
    path: 'tour',
    select: 'name',
  });

  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
