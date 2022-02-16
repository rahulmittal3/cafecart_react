const express = require("express");
const PaymentRouter = express.Router();

const {
  createPayment,
  codsuccess,
  finaliseCOD,
  createPaymentPrepaid,
  prepaidsuccess,
  prepaidfailure,
  finalisePrepaid,
} = require("../Controllers/Payment.js");
PaymentRouter.route("/create-payment").post(createPayment);
PaymentRouter.route("/codsuccess").post(codsuccess);
PaymentRouter.route("/finalise-cod").post(finaliseCOD);

//for prepaid payments
PaymentRouter.route("/create-payment-prepaid").post(createPaymentPrepaid);
PaymentRouter.route("/prepaid-success").post(prepaidsuccess);
PaymentRouter.route("/prepaid-failure").post(prepaidfailure);
PaymentRouter.route("/finalise-prepaid").post(finalisePrepaid);

module.exports = PaymentRouter;
