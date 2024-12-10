import { vehicles } from "./vehicles.js";
import { vehiclePrice } from "./vehicle-price-array.js";

export function tricycleFun(){
  const tricycle = document.getElementById('tricycle');
  const car = document.getElementById('car');
  const smallTruck = document.getElementById('small-truck');
  const bigTruck = document.getElementById('big-truck');
  const ticketLoss = document.getElementById('ticket-loss');

  const tricycleInput = tricycle.value.replace('NGN ', '');
  const carInput = car.value.replace('NGN ', '');
  const smallTruckInput = smallTruck.value.replace('NGN ', '');
  const bigTruckInput = bigTruck.value.replace('NGN ', '') ;
  const ticketLossInput = ticketLoss.value.replace('NGN ', '');

  vehicles.forEach((vehicle)=>{
    if(vehicle.id === '15b6fc6f-327a-4ec4-896f-486349e85a3d'){
      vehicle.price = tricycleInput;
      vehiclePrice.push(tricycleInput + '00');
      tricycle.value = '';  

    }else if (vehicle.id === 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'){
      vehicle.price = carInput;
      vehiclePrice.push(carInput + '00');
      car.value = '';
    }
    else if (vehicle.id === '83d4ca15-0f35-48f5-b7a3-1ea210004f2e'){
      vehicle.price = smallTruckInput;
      vehiclePrice.push(smallTruckInput + '00');
      smallTruck.value = '';
    }
    else if (vehicle.id === '54e0eccd-8f36-462b-b68a-8182611d9add'){
      vehicle.price = bigTruckInput;
      vehiclePrice.push(bigTruckInput + '00');
      bigTruck.value = '';
    }
    else if (vehicle.id === '54e0eccd-8f36-462b-b68a-8182611d9add3'){
      vehicle.price = ticketLossInput;
      vehiclePrice.push(ticketLossInput + '00');
      ticketLoss.value = '';
    }
  });
}

export {vehiclePrice};