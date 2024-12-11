import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ApiService } from '../services/api.service';
import { Dish } from '../models/dish';
import { Order } from '../models/order';
import { OrderItem } from '../models/orderitem';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from '../payment/payment.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, PaymentComponent, FormsModule,MatTableModule,MatPaginatorModule, MatSortModule,RouterModule ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
  
})
export class OrderSummaryComponent implements OnInit {
  items: Dish[] = [];
  total: number = 0;
  orderCreated = false;
  orderMessage = '';
  customerName = 'name';
  customerEmail = 'email';
  customerPhone = 'phone';

  constructor(
    private cartService: CartService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.items.reduce((acc, item) => acc + item.price, 0);
  }

  createOrder() {
    if(this.items.length === 0)
    {
      console.error("Cart is empty. Cannot create an order");
      alert("Cart is empty. Cannot create an order")      ;
      return;
    }
     // Create an array of OrderItems
     const orderItems: OrderItem[] = this.items.map(item => ({
      dishId: item.id,  // Assuming `item.id` is the dishId
      quantity: 1,  // This could be updated if quantity is tracked
      
    }));
    const order: Order = {
      id: null,  // Let the backend assign the order ID
      orderDate: new Date().toISOString(),  // Set current timestamp for order date
      totalAmount: this.total,
      customerName: this.customerName,
      customerEmail: this.customerEmail,
      customerPhone: this.customerPhone,
      items: orderItems
    }; 
      this.apiService.placeOrder(order).subscribe(response => {
      console.log('Order created:', response);
      const dataMap = new Map<string, string>(); 
      for (const key in response) { 
        if (response.hasOwnProperty(key)) {
           dataMap.set(key, response[key]); 
          } 
        }
      this.apiService.setOrderMap(dataMap);      
      // Clear the cart after the order is placed
      this.cartService.clearCart();
      this.orderCreated = true;  // Show order confirmation or payment details
      this.orderMessage = "Order created successfully!! Please enter your payment details.";
      }, error => {
      console.error('Error creating order:', error);
      this.orderMessage = 'Error creating order. Please try again.';
      });
    
  }
}
