import mongoose from "mongoose";

const patternSchema = new mongoose.Schema({
  patternType: String,
  patternContent: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

patternSchema.set("toJSON", {
  transform(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.user;
  },
});

export default mongoose.model("Pattern", patternSchema);
