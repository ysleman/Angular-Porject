export interface OrderItem {
    id: number;
    order_id: string;
    item_id: string;
    quantity: string;
    resturant_id: string;
    created_at: Date | null;
    updated_at: Date | null;
}
