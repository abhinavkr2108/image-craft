import mongoose, { Schema, models } from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    stripeId: {
      type: String,
      required: true,
      unique: true,
    },
    credits: {
      type: Number,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
