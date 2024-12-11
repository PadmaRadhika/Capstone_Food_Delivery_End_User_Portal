import { Component, OnInit } from '@angular/core'; 
import { ApiService } from '../services/api.service'; 
import { Restaurant } from '../models/restaurant'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, FormsModule,MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent implements OnInit { 
  restaurants: Restaurant[] = []; 
  constructor(private apiService: ApiService, private router: Router) { } 
  ngOnInit(): void { 
    this.apiService.getRestaurants().subscribe(data => { 
      this.restaurants = data; 
    });
   } 
   viewDishes(restaurantId: number) { 
    this.router.navigate(['/dishes', restaurantId]); 
  } 
}
