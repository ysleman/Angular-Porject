export interface RestaurantOrder {
    id: number;
    resturant_id: number | null;
    order_id: number | null;
    finished: string | null;
    created_at: Date | null;
    updated_at: Date | null;
}
