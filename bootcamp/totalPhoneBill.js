const planDetails = {
  'call 101': { call_price: 2.75, sms_price: 0.65 },
  'sms 101': { call_price: 2.00, sms_price: 0.50 },
  'call 201': { call_price: 3.00, sms_price: 0.70 },
  
};

export async function totalPhoneBill(price_plan, bills) {
 const plan = planDetails[price_plan];

  if (!plan) {
    throw new Error(`Plan "${price_plan}" not found.`);
  }

  
  if (!bills) {
    return (0).toFixed(2);
  }

  const billList = bills.split(',');
  let total = 0;

  for (let i = 0; i < billList.length; i++) {
    const bill = billList[i].trim();
    
    if (bill === 'call') {
      total += plan.call_price;  
    } else if (bill === 'sms') {
      total += plan.sms_price;  
    }
  }

  return total.toFixed(2);
}

// Usage example
const total = await totalPhoneBill('call 101', 'call, sms, call');
console.log(`Total bill: R${total}`);
