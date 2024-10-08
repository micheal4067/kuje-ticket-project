import { vehiclePrice } from "./vehicle-price-array.js";

// Export an array of vehicle objects
export const vehicles = [
  
  // Vehicle 1: Tricycle
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    name: 'Tricycle',
    image: './icons/tricycle.png',
    price: parseFloat(vehiclePrice[0]) || 10000
  },
  
  // Vehicle 2: Car
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    name: 'Car',
    image: './icons/suv-car.png',
    price: parseFloat(vehiclePrice[1]) || 20000
  },
  
  // Vehicle 3: Small Truck
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    name: 'Small Truck',
    image: './icons/small-truck.png',
    price: parseFloat(vehiclePrice[2]) || 30000
  },
  
  // Vehicle 4: Large Truck
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    name: 'Large Truck',
    image: './icons/big-truck.png',
    price: parseFloat(vehiclePrice[3]) || 40000
  },
  
  // Vehicle 5: Ticket Loss
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add3",
    name: 'Ticket Loss',
    image: './icons/ticket.png',
    price: parseFloat(vehiclePrice[4]) || 50000
  },
  
  // Vehicle 6: Total Ticket Issued
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add4",
    name: 'Total Ticket Issued',
    image: './icons/all-ticket-issued.png'
  }
];
