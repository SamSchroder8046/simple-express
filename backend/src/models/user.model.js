import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, // username whitespace is removed from before and after the username
            minLength: 1,
            maxLength: 30,
        },

        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 50
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        }
    },

    {
        timestamps: true
    }
);

// before saving any passwords we need to hash them

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

// compare passwords

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}
export const User = mongoose.model("User", userSchema);