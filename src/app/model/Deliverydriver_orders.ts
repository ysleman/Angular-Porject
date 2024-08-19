export interface DeliveryDriverOrder {
    id: number;
    driver_id: number | null;
    order_id: number | null;
    delivered: string | null;
    long: number | null;
    lat: number | null;
    created_at: Date | null;
    updated_at: Date | null;
}
