import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { Dish } from '../models/dish';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private restaurantsApiUrl = 'http://localhost:8082/api/restaurants';
  // private dishesApiUrl = 'http://localhost:8083/api/dishes';
  // private ordersApiUrl = 'http://localhost:8084/api/orders';
  // private paymentApiUrl = 'http://localhost:8085/api/payments';
  private restaurantsApiUrl = 'http://ec2-35-171-160-2.compute-1.amazonaws.com:8082/api/restaurants';
  private dishesApiUrl = 'http://ec2-35-171-160-2.compute-1.amazonaws.com:8083/api/dishes';
  private ordersApiUrl = 'http://ec2-35-171-160-2.compute-1.amazonaws.com:8084/api/orders';
  private paymentApiUrl = 'http://ec2-35-171-160-2.compute-1.amazonaws.com:8085/api/payments';

  constructor(private http: HttpClient) { }

  private orderMap: Map<string, any> = new Map();

  // Method to set the Map
  setOrderMap(map: Map<string, any>) {
    this.orderMap = map;
  }

  // Method to get the Map
  getOrderMap(): Map<string, any> {
    return this.orderMap;
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.restaurantsApiUrl}/all`);
  }

  getDishes(restaurantId: number): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.dishesApiUrl}/restaurant/${restaurantId}`);
  }
  placeOrder(order: any): Observable<any> { 
    return this.http.post(`${this.ordersApiUrl}/placeOrder`, order); 
  } 
  processPayment(payment: any): Observable<any> { 
    return this.http.post(`${this.paymentApiUrl}/makePayment`, payment); 
  }
}
