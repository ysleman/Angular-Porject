export interface TempOrder {
    id: number;
    user_id: string;
    item_id: string;
    quantity: string;
    created_at: Date | null;
    updated_at: Date | null;
}
