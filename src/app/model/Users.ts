export interface User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    admin: boolean;
    phone: string;
    birthDate: Date;
    password: string;
    temp_password: string | null;
    img: string;
    address: string | null;
    created_at: Date | null;
    updated_at: Date | null;
}
