import { User } from "./User";

export class UserBuilder {
    private readonly user: User;

    constructor() {
        this.user = new User();
    }

    public id(id: number): UserBuilder {
        this.user.id = id;
        return this;
    }

    public uuid(uuid: string): UserBuilder {
        this.user.uuid = uuid;
        return this;
    }

    public token(token: string): UserBuilder {
        this.user.token = token;
        return this;
    }

    public email(email: string): UserBuilder {
        this.user.email = email;
        return this;
    }

    public username(username: string): UserBuilder {
        this.user.username = username;
        return this;
    }

    public password(password: string): UserBuilder {
        this.user.password = password;
        return this;
    }

    public registrationTimestamp(registrationTimestamp: number): UserBuilder {
        this.user.registrationTimestamp = registrationTimestamp;
        return this;
    }

    public lastAccesTimestamp(lastAccesTimestamp: number): UserBuilder {
        this.user.lastAccesTimestamp = lastAccesTimestamp;
        return this;
    }

    public banned(banned: boolean): UserBuilder {
        this.user.banned = banned;
        return this;
    }

    public role(role: string): UserBuilder {
        this.user.role = role;
        return this;
    }

    public build(): User {
        return this.user;
    }
}