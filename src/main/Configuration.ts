import "reflect-metadata";
import LoginRepositoryPostgreSQL from "./login/infraestructure/repositories/LoginRepositoryPostgreSQL";
import { container } from "tsyringe";

container.register("LoginRepository", {
    useClass: LoginRepositoryPostgreSQL
});

export { container };