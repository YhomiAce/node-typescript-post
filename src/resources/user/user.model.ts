import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from './user.interface';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// UserSchema.pre<IUser>('save', async (next) =>{
//     if(!this.isModified('password')){
//         return next();
//     }
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;
//     next();
// })

export default model<IUser>('User', UserSchema);