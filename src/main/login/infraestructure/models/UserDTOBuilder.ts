import { User } from "../../domain/models/User";
import { UserBuilder } from "../../domain/models/UserBuilder";
import { UserDTO } from "./UserDTO";

export class UserDTOBuilder {
    private readonly userDTO: UserDTO;

    constructor() {
        this.userDTO = {
            id: -1,
            uuid: "",
            token: "",
            email: "",
            username: "",
            password: "",
            registrationTimestamp: 0,
            lastAccesTimestamp: 0,
            banned: false,
            role: ""
        };
    }

    public id(id: number): UserDTOBuilder {
        this.userDTO.id = id;
        return this;
    }

    public uuid(uuid: string): UserDTOBuilder {
        this.userDTO.uuid = uuid;
        return this;
    }

    public token(token: string): UserDTOBuilder {
        this.userDTO.token = token;
        return this;
    }

    public email(email: string): UserDTOBuilder {
        this.userDTO.email = email;
        return this;
    }

    public username(username: string): UserDTOBuilder {
        this.userDTO.username = username;
        return this;
    }

    public password(password: string): UserDTOBuilder {
        this.userDTO.password = password;
        return this;
    }

    public registrationTimestamp(registrationTimestamp: number): UserDTOBuilder {
        this.userDTO.registrationTimestamp = registrationTimestamp;
        return this;
    }

    public lastAccesTimestamp(lastAccesTimestamp: number): UserDTOBuilder {
        this.userDTO.lastAccesTimestamp = lastAccesTimestamp;
        return this;
    }

    public banned(banned: boolean): UserDTOBuilder {
        this.userDTO.banned = banned;
        return this;
    }

    public role(role: string): UserDTOBuilder {
        this.userDTO.role = role;
        return this;
    }

    public build(): UserDTO {
        return this.userDTO;
    }

    public toUser(userDTO: UserDTO): User {
        return new UserBuilder()
            .uuid(userDTO.uuid)
            .token(userDTO.token)
            .email(userDTO.email)
            .username(userDTO.username)
            .password(userDTO.password)
            .registrationTimestamp(userDTO.registrationTimestamp)
            .lastAccesTimestamp(userDTO.lastAccesTimestamp)
            .banned(userDTO.banned)
            .role(userDTO.role)
            .build();
    };
}