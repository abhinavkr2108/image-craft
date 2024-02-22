import mongoose, { Schema, models } from "mongoose";

export interface Image extends mongoose.Document {
  title: string;
  imageUrl: string;
  imageId: string;
  transformationType: string;
  width?: number;
  height?: number;
  config?: object;
  transformationUrl?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author?: { _id: string; fullName: string };
}
const ImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    transformationType: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: URL,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    config: {
      type: Object,
    },
    transformationUrl: {
      type: URL,
    },
    aspectRatio: {
      type: String,
    },
    color: {
      type: String,
    },
    prompt: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Image = models?.Image || mongoose.model("Image", ImageSchema);
