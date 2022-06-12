import LoginUseCase from "../../domain/services/LoginUseCase";
import { injectable } from "tsyringe";
import { User } from "../../domain/models/User";
import { LoginResponseBodyView } from "../models/LoginResponseBodyView";

@injectable()
export default class LoginAdapter {
    useCase: LoginUseCase;

    constructor(useCase: LoginUseCase) {
        this.useCase = useCase;
    }

    public async adapt(email: string, password: string): Promise<LoginResponseBodyView> {
        return this.userToResponse(await this.useCase.execute(email, password) as User);
    }

    private userToResponse(user: User): LoginResponseBodyView {
        return new LoginResponseBodyView(user.token!!);
    }

}
