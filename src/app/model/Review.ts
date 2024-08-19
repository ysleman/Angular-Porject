// src/app/models/review.model.ts
export interface Review {
    id: number;
    user_id: number;
    restaurant_id: number;
    rating: number;
    comment: string;
    created_at: string | null;
    updated_at: string | null;
  }
  