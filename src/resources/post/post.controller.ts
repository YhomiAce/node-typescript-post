import { Router, Response, Request, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/post/post.validation";
import PostService from "@/resources/post/post.service";

class PostController implements Controller {
    public path = "/posts";
    public router = Router();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        
    }
}