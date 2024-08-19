// src/app/models/menu-item.model.ts
import { MenuItemIngredient } from './menu-item-ingredient';

export interface MenuItem {
  id: number;
  resturant_id: string;
  name: string;
  description: string;
  price: string;
  img: string;
  quantity: string;
  created_at: string | null;
  updated_at: string | null;
  ingredients?: MenuItemIngredient[];
}
