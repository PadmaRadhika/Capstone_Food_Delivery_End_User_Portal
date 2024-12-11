import { Injectable } from '@angular/core';
import { Dish } from '../models/dish';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Dish[] = [];

  addToCart(dish: Dish) {
    this.items.push(dish);    
  }

  getItems(): Dish[] {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
