export type Role = 'ADMIN'

export interface User {
    username: string;
    contrasena: string;
}

export interface UserResponse {
    message: string;
    token: string;
    id: number;
    nombres?: string;
    apellidos?: string;
    username?: string
    role: Role;
    err?: boolean;
    msg?: string;
}