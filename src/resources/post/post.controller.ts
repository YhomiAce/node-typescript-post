import { Router, Response, Request, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/post/post.validation";
import PostService from "@/resources/post/post.service";

class PostController implements Controller {
    public path = "/posts";
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(
            `${this.path}`,
            this.getAllPost
        )
    }

    private create =async (req:Request, res: Response, next: NextFunction) => {
        try {
            const {title, body} = req.body;
            const post = await this.PostService.create(title, body);
            res.status(201).json({ post });
        } catch (error) {
            next(new HttpException(400, "Cannot create post"))
        }
    }

    private getAllPost = async (req:Request, res: Response, next: NextFunction) => {
        try {
            const post = await this.PostService.getPosts();
            res.status(200).json({ post });
        } catch (error) {
            next(new HttpException(400, "Cannot get post"))
        }
    }
}

export default PostController;