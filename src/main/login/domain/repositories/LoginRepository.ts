import { UserDTO } from "../../infraestructure/models/UserDTO";

export interface LoginRepository {
    getLogin(email: string, password: string): Promise<UserDTO | undefined>;
}