import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';
import { Dish } from '../models/dish';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule, MatSortModule, RouterModule],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.css'
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = [];
  restaurantId: number = -1;
  addedDishesCount: number = 0;


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.restaurantId = id !== null ? +id : -1;
    });
    
  }

  ngOnInit(): void {
    this.apiService.getDishes(this.restaurantId).subscribe(data => {
      this.dishes = data;
    });
  }

  addToCart(dish: Dish) { 
    this.addedDishesCount++;
    this.cartService.addToCart(dish);
  }
  
}
