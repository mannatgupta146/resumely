import { IUser } from "@/types/user.types";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
}, { timestamps: true })

userSchema.pre("save", function () : void{

    if( !this.isModified("password")) return

    this.password = bcrypt.hashSync(this.password, 10)
})

userSchema.methods.comparePassword = function (candidatePassword: string) : boolean{
    return bcrypt.compareSync(candidatePassword, this.password)
}

const userModel = mongoose.model("User", userSchema)
export default userModel    