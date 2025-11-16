import mongoose from "mongoose";

const Schema = mongoose.Schema;

const noticeSchema = new Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "general" },
    priority: { type: String, enum: ["normal", "important", "urgent"], default: "normal" },
    targetAudience: { type: String, default: "all" },
    fileUrl: { type: String, default: null },
    authorEmail: { type: String },
  },
  { timestamps: true }
);

const noticeModel = mongoose.model("notices", noticeSchema);
export default noticeModel;
