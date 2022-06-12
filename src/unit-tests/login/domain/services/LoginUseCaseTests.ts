import "reflect-metadata";
import LoginRepositoryPostgreSQL from "../../../../main/login/infraestructure/repositories/LoginRepositoryPostgreSQL";
import LoginUseCase from "../../../../main/login/domain/services/LoginUseCase";
import { mock, when, instance } from "ts-mockito";
import { UserDTO } from "../../../../main/login/infraestructure/models/UserDTO";
import { UserDTOBuilder } from "../../../../main/login/infraestructure/models/UserDTOBuilder";
import { LoginRepository } from "../../../../main/login/domain/repositories/LoginRepository";
import { User } from "../../../../main/login/domain/models/User";
import { ErrorMessages, HandledError } from "../../../../main/shared/domain/models/HandledError";
import { expect } from "chai";

const SOME_EMAIL = "email@email.com";
const SOME_PASSWORD = "password";
const SOME_TOKEN = "2a3260e6-b44b-11ec-b909-0242ac120002";
const SOME_LOGIN_NOT_FOUND_HANDLED_ERROR = new HandledError(ErrorMessages.LoginUserNotFound, "send valid login", 401);

describe("LoginUseCase", async () => {
  it("Should return user when email and password are correct", async () => {
    const userDTO: UserDTO = new UserDTOBuilder().token(SOME_TOKEN).build();
    const repository: LoginRepository = mock(LoginRepositoryPostgreSQL);
    when(repository.getLogin(SOME_EMAIL, SOME_PASSWORD)).thenResolve(userDTO);
    const useCase: LoginUseCase = new LoginUseCase(instance(repository));

    let result = await useCase.execute(SOME_EMAIL, SOME_PASSWORD);

    expect(result).to.be.an.instanceOf(User);
    expect((result as User).token).to.equal(SOME_TOKEN);
  });

  it("Should throw HandledError when user not found", async () => {
    const repository: LoginRepository = mock(LoginRepositoryPostgreSQL);
    when(repository.getLogin(SOME_EMAIL, SOME_PASSWORD)).thenResolve(undefined);
    const useCase: LoginUseCase = new LoginUseCase(instance(repository));

    try {
      await useCase.execute(SOME_EMAIL, SOME_PASSWORD);
    } catch (er) {
      expect(er).to.be.an.instanceOf(HandledError);
      expect((er as HandledError).message).to.equal(SOME_LOGIN_NOT_FOUND_HANDLED_ERROR.message);
      expect((er as HandledError).resolution).to.equal(SOME_LOGIN_NOT_FOUND_HANDLED_ERROR.resolution);
      expect((er as HandledError).responseStatus).to.equal(SOME_LOGIN_NOT_FOUND_HANDLED_ERROR.responseStatus);
    }
  });
});
