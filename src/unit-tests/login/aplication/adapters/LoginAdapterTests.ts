import "reflect-metadata";
import LoginUseCase from "../../../../main/login/domain/services/LoginUseCase";
import LoginAdapter from "../../../../main/login/aplication/adapters/LoginAdapter";
import { expect } from "chai";
import { mock, when, instance } from "ts-mockito";
import { UserBuilder } from "../../../../main/login/domain/models/UserBuilder";
import { User } from "../../../../main/login/domain/models/User";
import { LoginResponseBodyView } from "../../../../main/login/aplication/models/LoginResponseBodyView";

const SOME_EMAIL = "email@email.com";
const SOME_PASSWORD = "password";
const SOME_TOKEN = "2a3260e6-b44b-11ec-b909-0242ac120002";

describe("LoginAdapter", async () => {
    it("Should return reponseBodyView when email and password was correctly", async () => {
        const user: User = new UserBuilder().token(SOME_TOKEN).build();
        const useCase: LoginUseCase = mock(LoginUseCase);
        when(useCase.execute(SOME_EMAIL, SOME_PASSWORD)).thenResolve(user);
        const adapter: LoginAdapter = new LoginAdapter(instance(useCase));

        let result = await adapter.adapt(SOME_EMAIL, SOME_PASSWORD);

        expect(result).to.be.instanceOf(LoginResponseBodyView);
        expect((result as LoginResponseBodyView).token).to.equal(SOME_TOKEN);
    });
});
