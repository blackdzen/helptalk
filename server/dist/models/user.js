import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    patterns: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pattern",
        },
    ],
});
userSchema.set("toJSON", {
    transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.passwordHash;
        delete ret.__v;
    },
});
export default mongoose.model("User", userSchema);
