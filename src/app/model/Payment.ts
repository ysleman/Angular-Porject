export interface Payment {
    id: number;
    user_id: number;
    order_id: number;
    amount: number;
    currency: string;
    payment_method: string;
    status: string;
    created_at: Date | null;
    updated_at: Date | null;
}
