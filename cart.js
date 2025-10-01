// Debugging Summary
//---------------------
// - Console tab: Helped identify runtime errors like "undefined" when accessing cartItems[i]
// - Sources tab: Set breakpoints in calculateTotal and applyDiscount 
// - Scope panel: Used to inspect live values of variables like `total` during loop execution
// - Call stack: Verified the order in which functions were called
//-----------------------
//  Edge Cases Tested:
//------------------------
// - Empty cart
// - Single item cart
// - Discount rate = 0 and 1

const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  //bug fixed : Changed to < to avoid accessing undefined
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be <
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
      console.log(cartItems[i].price);
      console.log("Total -> "+total)
    }
  return total;
}

function applyDiscount(total, discountRate) {
  //bug fixed -> added validation
  if(total<0 || typeof total !== 'number'){
    throw new Error("Total must be a non negative number");
  }
  if(typeof discountRate !== 'number'|| discountRate < 0 || discountRate >1){
    throw new Error("Discount rate needs to eba number between 0 and 1")
  }
  return total - total * discountRate; // Bug: Missing validation for discountRate
}

function generateReceipt(cartItems, total) {
  //bug fixed -> check to make sure total is a number
  if(typeof total !== 'number'){
    throw new Error("Total needs to be a number")
  }
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
  receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;

