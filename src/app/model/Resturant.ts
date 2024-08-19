// src/app/models/restaurant.model.ts
export interface Restaurant {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  created_at: string | null;
  updated_at: string | null;
}
