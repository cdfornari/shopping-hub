export interface RegisterDto {
    name: string;
    email: string;
    password: string;
    rif: string;
    logo: File;
    phoneNumber: string;
}

export interface RegisterAdmin {
    email: string,
    password: string,
}