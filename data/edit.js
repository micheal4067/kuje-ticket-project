import { vehicles } from "./vehicles.js";
import { vehiclePrice } from "./vehicle-price-array.js";

// Function to update prices
export function tricycleFun() {
  // Get input fields
  const tricycle = document.getElementById('tricycle');
  const car = document.getElementById('car');
  const smallTruck = document.getElementById('small-truck');
  const bigTruck = document.getElementById('big-truck');
  const ticketLoss = document.getElementById('ticket-loss');

  // Extract input values (removing 'NGN ' prefix)
  const inputs = {
    '15b6fc6f-327a-4ec4-896f-486349e85a3d': tricycle.value.replace('NGN ', ''),
    'e43638ce-6aa0-4b85-b27f-e1d07eb678c6': car.value.replace('NGN ', ''),
    '83d4ca15-0f35-48f5-b7a3-1ea210004f2e': smallTruck.value.replace('NGN ', ''),
    '54e0eccd-8f36-462b-b68a-8182611d9add': bigTruck.value.replace('NGN ', ''),
    '54e0eccd-8f36-462b-b68a-8182611d9add3': ticketLoss.value.replace('NGN ', ''),
  };

  // Update vehicles and vehiclePrice
  vehicles.forEach((vehicle, index) => {
    const inputValue = inputs[vehicle.id];

    // Validate input
    if (inputValue && !isNaN(parseFloat(inputValue))) {
      // Append "00" to the input value and parse it as a number
      const updatedPrice = parseFloat(inputValue + '00');

      // Update the price in `vehicles`
      vehicle.price = updatedPrice;

      // Update `vehiclePrice` array
      vehiclePrice[index] = updatedPrice;

      // Clear the input field
      if (vehicle.id === '15b6fc6f-327a-4ec4-896f-486349e85a3d') tricycle.value = '';
      else if (vehicle.id === 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6') car.value = '';
      else if (vehicle.id === '83d4ca15-0f35-48f5-b7a3-1ea210004f2e') smallTruck.value = '';
      else if (vehicle.id === '54e0eccd-8f36-462b-b68a-8182611d9add') bigTruck.value = '';
      else if (vehicle.id === '54e0eccd-8f36-462b-b68a-8182611d9add3') ticketLoss.value = '';
    }
  });



  console.log("Updated vehicle prices:", vehiclePrice);
}

export { vehiclePrice };
