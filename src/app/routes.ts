import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { DishListComponent } from './dish-list/dish-list.component';
import { CartComponent } from './cart/cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home/home.component';

const routeConfig: Routes = [
    { path: '', 
        component: HomeComponent,
        title: 'Home Page'
      },  
  { path: 'restaurants', 
    component: RestaurantListComponent,
    title: 'Restaurants List Page'
  },
  { path: 'dishes/:id', 
    component: DishListComponent,
    title: 'Dishes List Page' 
  },
  { path: 'cart', 
    component: CartComponent,
    title: 'Shopping Cart Page' 
  },
  { path: 'order-summary', 
    component: OrderSummaryComponent,
    title: 'Order Summary Page' 
  },
  { path: 'payment', 
    component: PaymentComponent,
    title: 'Payment Page'
  }
];
export default routeConfig;