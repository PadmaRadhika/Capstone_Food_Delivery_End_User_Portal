import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Dish } from '../models/dish';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule, MatTableModule,MatPaginatorModule, MatSortModule, RouterModule ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: Dish[] = [];
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    
  }

  clearCart() {
    this.items = this.cartService.clearCart();
  }
}
