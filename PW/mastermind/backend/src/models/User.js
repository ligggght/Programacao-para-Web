import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  avatarSeed: { type: String, required: true },
  avatarStyle: { type: String, required: true },
});

export default mongoose.model('User', UserSchema);
