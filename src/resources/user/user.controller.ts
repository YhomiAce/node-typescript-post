import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from './user.validation';
import UserService from './user.service';
import authenticated from '@/middleware/authenticated.middleware';

class UserController implements Controller {
    public path = "/user";
    public router: Router = Router();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        this.router.get(
            `${this.path}`,
            authenticated,
            this.getUser
        )
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction

    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;
            const hashPassword = bcrypt.hashSync(password, 10);
            const token = await this.UserService.register(name, email, hashPassword, 'user');
            res.status(201).send({
                status: true,
                token
            })
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }
    private login = async (
        req: Request,
        res: Response,
        next: NextFunction

    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const token = await this.UserService.login(email, password);
            res.status(200).send({
                status: true,
                token
            })
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }

    private getUser = async (
        req: Request,
        res: Response,
        next: NextFunction

    ): Promise<Response | void> => {
        try {
            if (!req.user) {
                return next(new HttpException(404, "No Logged in user"))
            }
            res.status(200).send({
                status: true,
                user: req.user
            })
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }
}

export default UserController