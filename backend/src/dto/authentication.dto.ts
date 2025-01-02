export interface AuthenticationInputDTO {
    grant_type: 'password';
    username: string;
    password: string;
}

export interface AuthenticationOutputDTO {
    message : string;
    token? : string;
}