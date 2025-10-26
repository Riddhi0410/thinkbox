import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.pre("save", async function(next){
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next()  
})
UserSchema.methods.matchPassword = async function(enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password)
}

export default mongoose.model("User", UserSchema);
