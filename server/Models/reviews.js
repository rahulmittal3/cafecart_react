// const mongoose = require("mongoose");

// const reviewSchema = new mongoose.Schema({
//   reviews: [
//     {
//       name: {
//         type: String,
//         required: false,
//       },
//       rating: {
//         type: Number,
//         default: 5,
//       },
//       comment: {
//         type: String,
//         required: [true, "A Review must have some text content"],
//       },
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     },
//   ],
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//   },
// });

// module.exports = mongoose.model("Review", reviewSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    comment: String,
    rating: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
