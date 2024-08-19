export interface DeliveryDriver {
    id: number;
    full_Name: string;
    username: string;
    password: string;
    phone: string;
    created_at: Date | null;
    updated_at: Date | null;
}
