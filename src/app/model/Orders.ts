export interface Order {
    id: number;
    user_id: string;
    driver_id: string;
    orderDate: Date;
    totalPrice: string;
    created_at: Date | null;
    updated_at: Date | null;
}
