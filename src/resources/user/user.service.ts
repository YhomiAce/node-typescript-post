import bcrypt from 'bcrypt';
import UserModel from './user.model';
import { createToken } from '@/utils/token';
import IUser from './user.interface';

class UserService {
    /**
     * Register a new User
     */
    public async register(
        name: string,
        email:string,
        password: string,
        role: string
    ): Promise<string | Error>{
        try {
            const userExist = await UserModel.findOne({email});
            if(userExist){
                throw new Error("User already registered")
            }
            const user  = await UserModel.create({name, email, password, role});
            const accessToken = createToken(user);
            return accessToken;
        } catch (error) {
            console.log(error);
            
            throw new Error("Unable to create user")
        }

    }

    /**
     * Login a user
     */
    public async login(email:string, password: string): Promise<string | Error> {
        try {
            const user = await UserModel.findOne({email});
            if(!user){
                throw new Error("Unable to find user with this email")
            }
            const isCorrect = bcrypt.compareSync(password, user.password);
            if (!isCorrect) {
                throw new Error("Invalid user name or password")
            }
            const accessToken = createToken(user);
            return accessToken;
        } catch (error) {
            throw new Error("Unable to login user")
        }
    }
}

export default UserService;