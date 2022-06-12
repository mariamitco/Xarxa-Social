export class User {
    id?: number;
    uuid?: string;
    token?: string;
    email?: string;
    username?: string;
    password?: string;
    registrationTimestamp?: number;
    lastAccesTimestamp?: number;
    banned?: boolean;
    role?: string;
}