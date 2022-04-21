import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Controller from "@/utils/interfaces/controller.interface";
import ErrorMiddleware from "@/middleware/error.middleware";

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initailiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan("dev"));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: false}));
        this.express.use(compression());
    }

    private initialiseControllers(controllers: Controller[]):void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api')
        });
    }

    private initialiseErrorHandling() : void {
        this.express.use(ErrorMiddleware);
    }

    private initailiseDatabaseConnection (): void {
        mongoose.connect(process.env.MONGO_URI)
        // .then(()=>{
        //     console.log("Database Connected");
            
        // }).catch((err) =>{
        //     console.log(err);
        //     process.exit(1)
        // })
    }

    public listen(): void {
        this.express.listen(this.port, ()=>{
            console.log(`App Listening on PORT ${this.port}`);
            
        })
    }
}

export default App;