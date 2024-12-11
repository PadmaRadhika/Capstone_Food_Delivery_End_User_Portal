import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentSuccess: boolean = false;
  paymentDetails = {
    cardNumber: '',
    expiry: '',
    cvv: '',
    billingAddress: '',
    zipcode: ''
  }; 
  constructor(    
    private apiService: ApiService
  ) { }
  order = {
    id: null,
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  };

  payment = {
    orderId: null,
    amount: null,
    status: 'Paid',
    paymentDate: new Date()
  };
  onSubmit(form: NgForm) {
    if (form.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }
    this.order.id = this.payment.orderId = this.apiService.getOrderMap().get("id");
    this.payment.amount = this.apiService.getOrderMap().get("totalAmount");    
    const requestBody = {
      payment: this.payment,
      order: this.order
    };
    console.log("Requestbody::", requestBody);
    this.apiService.processPayment(requestBody).subscribe(
      response => {
        // Handle the response here
        this.paymentSuccess = true;
        console.log('Payment processed:', response);
        
      },
      error => {
        // Handle the error here
        console.error('Error processing payment:', error);
      }
    );
    
  }
}
