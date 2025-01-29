import Role from "./role";

export interface User {
    id: string;
    ci: string;
    role: Role;
    active: boolean;
}

export interface RegisterUser {
    ci:string;
    role:Role;
    password:string
}