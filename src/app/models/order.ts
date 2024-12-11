import { OrderItem } from "./orderitem";

export interface Order {
    id: number | null;
    orderDate: string;
    totalAmount: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: OrderItem[];
  }