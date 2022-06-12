import "reflect-metadata";
import LoginAdapter from "../../../../main/login/aplication/adapters/LoginAdapter";
import cors from "cors";
import express from "express";
import LoginController from "../../../../main/login/aplication/controllers/LoginController";
import { assert } from "chai";
import { mock, when, instance } from "ts-mockito";
import { LoginResponseBodyView } from "../../../../main/login/aplication/models/LoginResponseBodyView";
import { ErrorMessages, HandledError } from "../../../../main/shared/domain/models/HandledError";

//TODO refactor y revisar throws

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = express();
const loginAdapter = mock(LoginAdapter);
chai.use(chaiHttp);

const LOGIN_PATH = "/login";
const SOME_EMAIL = "email@email.com";
const SOME_PASSWORD = "password"
const SOME_TOKEN = "2a3260e6-b44b-11ec-b909-0242ac120002";
const KO_STATUS_400: number = 400;
const KO_STATUS_401: number = 401;
const KO_STATUS_500: number = 500;
const OK_STATUS: number = 200;
const EXPECTED_PARAMETERS_RESOLUTION = "send expected parameters";
const SEND_VALID_LOGIN_RESOLUTION = "send valid login";
const SOME_DATABASE_ERROR = "database error example";
var server: any;

describe("LoginController", async () => {
    before(() => {
        console.log("me ejecuto antes");
        app.use(cors());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        server = app.listen(3000);
        const loginController = new LoginController(instance(loginAdapter));
        app.use('/login', loginController.routes());
    });

    after(() => {
        server.close();
    });

    it("Should return response with error 'error parsing request body' when email or password are missing", async () => {
        let result = await chai.request(app)
            .get(LOGIN_PATH)
            .send({ email: SOME_EMAIL });

        assert.equal(result.status, KO_STATUS_400);
        assert.equal(result.body.error, ErrorMessages.RequestBodyError,);
        assert.equal(result.body.resolution, EXPECTED_PARAMETERS_RESOLUTION);
    });

    it("Should return response with token when email and password are in body, and user in database exists", async () => {
        when(loginAdapter.adapt(SOME_EMAIL, SOME_PASSWORD)).thenResolve(new LoginResponseBodyView(SOME_TOKEN));
        let result = await chai.request(app)
            .get(LOGIN_PATH)
            .send({ email: SOME_EMAIL, password: SOME_PASSWORD });

        assert.equal(result.body.token, SOME_TOKEN);
        assert.equal(result.status, OK_STATUS);

    });

    it("Should return user not found error when emaild and password doesn't match with anything on database", async () => {
        when(loginAdapter.adapt(SOME_EMAIL, SOME_PASSWORD)).thenThrow(new HandledError(ErrorMessages.LoginUserNotFound, SEND_VALID_LOGIN_RESOLUTION, 401) as Error);
        let result = await chai.request(app)
            .get(LOGIN_PATH)
            .send({ email: SOME_EMAIL, password: SOME_PASSWORD });

        assert.equal(result.status, KO_STATUS_401);
        assert.equal(result.body.error, ErrorMessages.LoginUserNotFound);
        assert.equal(result.body.resolution, SEND_VALID_LOGIN_RESOLUTION);
    });

    it("Should return database error when database error", async () => {
        when(loginAdapter.adapt(SOME_EMAIL, SOME_PASSWORD)).thenThrow(new HandledError(ErrorMessages.DBError, SOME_DATABASE_ERROR, 500) as Error);
        let result = await chai.request(app)
            .get(LOGIN_PATH)
            .send({ email: SOME_EMAIL, password: SOME_PASSWORD });

        assert.equal(result.status, KO_STATUS_500);
        assert.equal(result.body.error, ErrorMessages.DBError);
        assert.equal(result.body.resolution, SOME_DATABASE_ERROR);
    });

    it("Should return server error when any error", async () => {
        when(loginAdapter.adapt(SOME_EMAIL, SOME_PASSWORD)).thenThrow(new Error("any error"));
        let result = await chai.request(app)
            .get(LOGIN_PATH)
            .send({ email: SOME_EMAIL, password: SOME_PASSWORD });

        assert.equal(result.status, KO_STATUS_500);
        assert.equal(result.body.error, "internal server error.");
        assert.equal(result.body.resolution, "");
    });
});