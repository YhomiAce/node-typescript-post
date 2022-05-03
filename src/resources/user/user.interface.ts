import { Document} from 'mongoose';

interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;

    isValidPassword(password:string): Promise<Error | boolean>
}

export default IUser;