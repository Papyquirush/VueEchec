export interface AuthenticationInputDTO {
    username: string;
    password: string;
}




export interface AuthenticationOutputDTO {
    message : string;
    token? : string;
}