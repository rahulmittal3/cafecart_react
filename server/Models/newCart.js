const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    //   items: [
    //     {
    //       productId: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Product",
    //       },
    //       qty: {
    //         type: Number,
    //         default: 0,
    //       },
    //       price: {
    //         type: Number,
    //         default: 0,
    //       },
    //       codprepaid: {
    //         type: Number,
    //         default: 0,
    //       },
    //       title: {
    //         type: String,
    //       },
    //       productCode: {
    //         type: String,
    //       },
    //     },
    //   ],
    //   totalQty: {
    //     type: Number,
    //     default: 0,
    //     required: true,
    //   },
    //   coupon: {
    //     type: String,
    //     default: null,
    //   },
    //   pricedrop: {
    //     type: Number,
    //     default: 0,
    //   },
    //   discountAmount: {
    //     type: Number,
    //     default: 0,
    //   },
    //   totalCost: {
    //     type: Number,
    //     default: 0,
    //     required: true,
    //   },
    //   totalcodprepaid: {
    //     type: Number,
    //     default: 0,
    //     required: true,
    //   },
    //   user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: false,
    //   },
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          default: 1,
          type: Number,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    discountApplied: {
      type: Number,
      default: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewCart", cartSchema);
