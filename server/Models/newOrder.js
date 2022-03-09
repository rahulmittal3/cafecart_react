const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerContact: {
      type: Number,
      required: true,
    },
    customerPin: {
      type: Number,
      required: true,
    },
    customerAddress: { type: String, required: true },
    customerCity: {
      type: String,
      required: true,
    },
    customerState: {
      type: String,
      required: true,
    },
    orderType: {
      //either COD OR PREPAID ofcourse
      type: String,
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: Number,
      },
    ],
    SRID: {
      type: String,
      required: true,
    },
    SRShipmentId: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    discountApplied: {
      type: Number,
      required: true,
    },
    netAmount: {
      type: Number,
      required: true,
    },
    paymentId: {
      //only when It is Prepaid
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    Delivered: {
      type: Boolean,
      default: false,
    },
    couponName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewOrder", orderSchema);
