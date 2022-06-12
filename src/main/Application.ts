import "reflect-metadata"
import express from 'express';
import cors from 'cors';
import LoginController from "./login/aplication/controllers/LoginController";
import dotenv from "dotenv"
import { container } from "./Configuration";

const app = express();

//enviroment setting
dotenv.config({ path: `enviroments/${process.env.ENV}.env` });

// settings
app.set('port', process.env.APPLICATION_PORT);

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// controllers
app.use('/login', container.resolve(LoginController).routes());

//start listening
app.listen(app.get('port'));

//execution console information
console.log("------------------");
console.log("Enviroment: ", process.env.ENV);
console.log(`Listening on http://localhost:${app.get('port')}`);
console.log("------------------");

export default app;