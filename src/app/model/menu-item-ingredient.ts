import { Ingredient } from './ingredient';

export interface MenuItemIngredient {
  id: number;
  itemid: string;
  IngredientID: Ingredient;
  created_at: string | null;
  updated_at: string | null;
}
